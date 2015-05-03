class SongController < ApplicationController

	def search
		@host = Host.find_by_room params[:host_id]
				access_token = @host.at
			  	access_token_secret = @host.ats
				rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
					[access_token, access_token_secret])
		@songs = rdio.call('search', ({ "query" => params[:title], "types" => "Track" }))['result']['results']
	end

	def create
		@host = Host.find_by_room params[:host_id]
		rdio = rdio_init
  		@songParams = rdio.call('get', ({ "keys" => params[:trackKey] }))['result']
  		@song = Song.new( 
  				title: @songParams[params[:trackKey]]['name'], 
  				artist: @songParams[params[:trackKey]]['artist'], 
  				key: @songParams[params[:trackKey]]['key'], 
  				playlist_id: @host.playlist.id, 
  				image: @songParams[params[:trackKey]]['gridIcon']
  			)
		if @song.save
			rdio.call('addToPlaylist', ({ playlist: @host.playlist.key, tracks: @song.key }))
			WebsocketRails['host' + @host.id.to_s].trigger :new_track, @song.to_json
			redirect_to '/party/' + @host.room
		else
			flash[:error] = "Song already in playlist, brah."
			redirect_to '/party/' + @host.room
		end
	end

	def song_search
		song_search = params.permit(:trackKey)
	end

 	def like
 		rdio = rdio_init
 		@song = Song.find_by_id(params[:song])
 		if session[:host].blank?
	 		@guest = Guest.find_by(id: session['guest_id'])
	 		@guest.like(@song)
	 		@guest.songs << @song
	 	end
 		if @song.save
 			reorder_playlist
 			@order = rdio.call('get', ({ "keys" => @song.playlist.key, "extras" => "tracks" }))['result'][@song.playlist.key]['tracks'].map { |n| n['key']}
 			WebsocketRails['host' + @host.id.to_s].trigger :track_vote, { song: @song.to_json, order: @order.to_json }
		end
	end

	def update_playlist
		rdio = rdio_init
		@host = Host.find_by_room params[:host_id]
		rdio_order = ''
		@host.playlist.songs.sort_by {|song| [song.vote]}.reverse.each do |song|
			rdio_order = rdio_order + song.key + ', '
		end
		rdio.call('setPlaylistOrder', ({playlist: @host.playlist.key, tracks: rdio_order}))
		@order = rdio.call('get', ({ "keys" => @host.playlist.key, "extras" => "tracks" }))['result'][@host.playlist.key]['tracks'].map { |n| n['key']}
		WebsocketRails['host' + @host.id.to_s].trigger :update_list, { order: @order.to_json }
		head :ok
	end

	def dislike
		rdio = rdio_init
 		@song = Song.find_by_id(params[:song])
 		@guest = Guest.find_by(id: session['guest_id'])
 		@guest.dislike(@song)
 		@guest.songs << @song
 		if @song.save
 			reorder_playlist
 			@order = rdio.call('get', ({ "keys" => @guest.host.playlist.key, "extras" => "tracks" }))['result'][@guest.host.playlist.key]['tracks'].map { |n| n['key']}
 			WebsocketRails['host' + @host.id.to_s].trigger :track_vote, { song: @song.to_json, order: @order.to_json }
		end
	end

	def clear
		@host = Host.find_by_room params[:host_id]
		@song = Song.where(key: params[:key], playlist_id: @host.playlist.id)[0]
		@song.vote = 0
		if @song.save
			WebsocketRails['host' + @song.playlist.host.id.to_s].trigger :reset_vote, { song: @song.id.to_json }
			head :ok
		end
	end

	def reorder_playlist
		@host = Host.find_by_room params[:host_id]
		rdio = rdio_init
		@order = ""
		@host.playlist.songs.sort_by {|song| [song.vote]}.reverse.each do |song|
			@order = @order + song.key + ', '
		end
		rdio.call('setPlaylistOrder', ({playlist: @host.playlist.key, tracks: @order}))
		head :ok
	end

	def rdio_init
		@host = Host.find_by_room params[:host_id]
		access_token = @host.at
	  	access_token_secret = @host.ats
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end
end
