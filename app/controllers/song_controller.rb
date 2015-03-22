class SongController < ApplicationController
	def index
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