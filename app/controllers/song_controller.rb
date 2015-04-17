class SongController < ApplicationController

	def search
		@song = Song.new
	end

	def create
<<<<<<< HEAD
		access_token = session[:at]
		access_token_secret = session[:ats]
		@song = Song.new(song_search)
  		@songParams = @song.genSong access_token, access_token_secret
  		session[:song_key] = @songParams['key']
  		@currentUser = session['user']
  		@song.artist =  @songParams['artist']
  		@song.key =  @songParams['key']
		if @song.save
=======
		@host = Host.find_by_room params[:host_id]
		rdio = rdio_init
  		@songParams = rdio.call('search', ({ "query" => params[:song][:title], "types" => "Track" }))['result']['results'][0]
  		@song = Song.new(title: song_search['title'], artist: @songParams['artist'], key: @songParams['key'], playlist_id: @host.playlist.id )
		if @song.save
			rdio.call('addToPlaylist', ({ playlist: @host.playlist.key, tracks: @song.key }))
>>>>>>> 96007dc82d71af6b9f99f0a652b95b481138d8ad
			redirect_to '/' + @host.room
		end
	end

	def song_search
		song_search = params.require(:song).permit(:title)
	end

	def rdio_init
		access_token = session[:at]
	  	access_token_secret = session[:ats]
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end
end
