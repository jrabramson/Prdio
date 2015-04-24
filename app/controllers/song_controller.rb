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
		@guest.like(song)
		redirect_to guest.host.room
	end

	def rdio_init
		access_token = session[:at]
	  	access_token_secret = session[:ats]
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end
end
