class SongController < ApplicationController

	def search
		@song = Song.new
	end

	def create
		access_token = session[:at]
		access_token_secret = session[:ats]
		@song = Song.new(song_search)
  		@songParams = @song.genSong access_token, access_token_secret
  		session[:song_key] = @songParams['key']
  		@currentUser = session['user']
  		@song.artist =  @songParams['artist']
  		@song.key =  @songParams['key']
		if @song.save
			redirect_to '/' + @host.room
		end
	end

	def song_search
		song_search = params.require(:song).permit(:title)
	end

end
