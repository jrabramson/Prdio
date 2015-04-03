class SongController < ApplicationController
	def index
		# get access tokens from the user session
		access_token = session[:at]
	  	access_token_secret = session[:ats]
	  	# if they are logged in
	  	if access_token and access_token_secret
	  		# create a new rdio instance and get the current user
		  	rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
	                    [access_token, access_token_secret])
		  	@currentUser = session['user']
		else
			# if they are not logged in
			session.clear
		  	# begin the authentication process
			rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]])
			callback_url = (URI.join request.url, '/callback').to_s
			url = rdio.begin_authentication(callback_url)
			# save our request token in the session
			session[:rt] = rdio.token[0]
			session[:rts] = rdio.token[1]
			# go to Rdio to authenticate the app
			redirect_to url
		end
	end

	def callback
		# get the state from cookies and the query string
		request_token = session[:rt]
		request_token_secret = session[:rts]
		verifier = params[:oauth_verifier]
		# make sure we have everything we need
		if request_token and request_token_secret and verifier
			# exchange the verifier and request token for an access token
			rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[request_token, request_token_secret])
			rdio.complete_authentication(verifier)
			# save the access token in cookies (and discard the request token)
			session[:at] = rdio.token[0]
			session[:ats] = rdio.token[1]
			session[:user] = rdio.call('currentUser')['result']
			session.delete(:rt)
			session.delete(:rts)
			# go to the home page
			redirect_to('/')
		else
			# we're missing something important
			redirect_to('/logout')
		end
	end

	def logout
  		session.clear
  		redirect to('/')
	end

	def search
		@song = Song.new
	end

	def getsong
		access_token = session[:at]
		access_token_secret = session[:ats]
		@song = Song.new(song_search)
  		@songParams = @song.genSong access_token, access_token_secret
  		session[:song_key] = @songParams['key']
  		@currentUser = session['user']
  		@song.artist =  @songParams['artist']
  		@song.key =  @songParams['key']
		if @song.save
			render :index
		end
	end

	def song_search
		song_search = params.require(:song).permit(:title)
	end

end
