class SongController < ApplicationController

	def search
		@host = Host.find_by_room params[:host_id]
		rdio = rdio_init
		@songs = rdio.call('search', ({ "query" => params[:title], "types" => "Track" }))['result']['results']
	end

	def create
		@host = Host.find_by_room params[:host_id]
		rdio = rdio_init
  		@songParams = rdio.call('get', ({ "keys" => params[:trackKey] }))['result']
  		@song = Song.new(title: @songParams[params[:trackKey]]['name'], artist: @songParams[params[:trackKey]]['artist'], key: @songParams[params[:trackKey]]['key'], playlist_id: @host.playlist.id )
		if @song.save
			rdio.call('addToPlaylist', ({ playlist: @host.playlist.key, tracks: @song.key }))
			redirect_to '/' + @host.room
		else
			render 'search'
		end
	end

	def song_search
		song_search = params.permit(:trackKey)
	end

 	def like
 		@song = Song.find_by_id(params[:song])
 		@guest = Guest.find_by(id: session['guest_id'])
 		@guest.like(@song)
 		@guest.songs << @song
 		if @song.save
 			@song.reorder_playlist
 			respond_to do |format|
 				format.json { render json: @song }
 			end
		end
	end

	def dislike
		@song = Song.find_by_id(params[:song])
 		@guest = Guest.find_by(id: session['guest_id'])
 		@guest.dislike(@song)
 		@guest.songs << @song
 		if @song.save
			respond_to do |format|
 				format.json { render json: @song }
 			end
		end
	end

	def reorder_playlist song
		rdio = rdio_init
		@order = ""
		song.playlist.songs.sort_by {|song| [song.vote]}.reverse.each do |song|
			@order = @order + song.key + ', '
		end
		rdio.call('setPlaylistOrder', ({playlist: song.playlist.key, tracks: @order}))
	end

	def rdio_init
		@host = Host.find_by_room params[:host_id]
		access_token = @host.at
	  	access_token_secret = @host.ats
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end
end
