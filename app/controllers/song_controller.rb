class SongController < ApplicationController

	def search
		@host = current_host
		rdio = rdio_init
		@songs = rdio.call('search', ({ "query" => params[:title], "types" => "Track" }))['result']['results']
	end

	def create
		@host = current_host
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
 		host = current_host
 		# rdio = rdio_init
 		song = Song.find_by_id(params[:song])
 		guest = Guest.find_by(id: session['guest_id'])
 		guest.like(song)
 		guest.songs << song
 		if song.save
 			# order = rdio.call('get', ({ "keys" => song.playlist.key, "extras" => "tracks" }))['result'][song.playlist.key]['tracks'].map { |n| n['key']}
 			WebsocketRails['host' + host.id.to_s].trigger :like_track, { song: song.id }
		end
		head :ok
	end

	def dislike
		host = current_host
		# rdio = rdio_init
 		song = Song.find_by_id(params[:song])
 		guest = Guest.find_by(id: session['guest_id'])
 		guest.dislike(song)
 		guest.songs << song
 		if song.save
 			# order = rdio.call('get', ({ "keys" => guest.host.playlist.key, "extras" => "tracks" }))['result'][guest.host.playlist.key]['tracks'].map { |n| n['key']}
 			WebsocketRails['host' + host.id.to_s].trigger :dislike_track, { song: song.id }
		end
		head :ok
	end

	def update_playlist
		rdio = rdio_init
		@host = current_host
		rdio_order = ''
		@host.playlist.songs.sort_by {|song| [song.vote]}.reverse.each do |song|
			rdio_order = rdio_order + song.key + ', '
		end
		rdio.call('setPlaylistOrder', ({playlist: @host.playlist.key, tracks: rdio_order}))
		@order = rdio.call('get', ({ "keys" => @host.playlist.key, "extras" => "tracks" }))['result'][@host.playlist.key]['tracks'].map { |n| n['key']}
		WebsocketRails['host' + @host.id.to_s].trigger :update_list, { order: @order.to_json }
		head :ok
	end

	def rdio_init
		access_token = current_host.at
	  	access_token_secret = current_host.ats
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end

	def current_host
		current_host = Host.find_by_room params[:host_id]
	end
end
