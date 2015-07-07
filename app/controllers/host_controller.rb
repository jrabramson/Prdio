class HostController < ApplicationController
	def new
	  	if has_access_token?
	  		@playlists = Host.party_setup access_token
	  		@currentUser = session['user']
		else
			session.clear
			redirect_to 'https://www.rdio.com/oauth2/authorize/?response_type=code&client_id=fcjhwmdw35hxxjlrkcni63gwnq&redirect_uri=http://localhost:3000/callback'
		end
	end


	def show
		@host = Host.find_by( room: params[:id] )
		if session[:host] == @host.room
			@thehost = true
		elsif session[:guest_id].present?
			@guest = Guest.find_by_id session[:guest_id]
		else
			redirect_to '/'
		end
		rdio = Host.rdio_init params[:id]
	end

	def create
		access_token = session[:at]
	  	# access_token_secret = session[:ats]
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			access_token)
		if new_party['reuse'].blank?
			@playlist = rdio.call('createPlaylist', ({ "name" => new_party['playlist'], "description" => "", "tracks" => "" }))
			@playlist = @playlist['result']['key']
		else
			@playlist = new_party['reuse']
		end
		@host = Host.new(
				key: session['user']['key'], 
				room: (0...4).map { (65 + rand(26)).chr }.join, 
				username: session['user']['firstName'], 
				at: session[:at], 
				ats: session[:ats])
		if @host.save
			session[:host] = @host.room
			Playlist.create(key: @playlist, host_id: @host.id, name: new_party['playlist'] )
			if new_party['reuse'].present?
				rdio.songs_for_playlist(@host.playlist.key).each do |s|
					Song.create(
						title: s['name'], 
		  				artist: s['artist'], 
		  				key: s['key'], 
		  				playlist_id: @host.playlist.id, 
		  				image: s['dynamicIcon'] )
				end
			end
			redirect_to '/party/' + @host.room
		else
			render 'new'
		end

	end


	def callback
		code = params[:code]
		key = ENV["RDIO_CONSUMER_KEY"]
		secret = ENV["RDIO_CONSUMER_SECRET"]
		url = "https://services.rdio.com/oauth2/token"

		uri = URI(url)

		Net::HTTP.start(uri.host, uri.port,
		  :use_ssl => uri.scheme == 'https', 
		  :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

		  request = Net::HTTP::Post.new uri.request_uri
		  request.basic_auth key, secret
		  request.set_form_data({
		  	grant_type: 'authorization_code',
		  	code: code,
		  	redirect_uri: 'http://localhost:3000/callback'
		  })

		  response = http.request request # Net::HTTPResponse object
		  response = JSON.parse response.body

		  session[:at] = response['access_token']
		  rdio = Rdio.new([
				Rails.configuration.rdio[:key], 
				Rails.configuration.rdio[:secret]], 
			access_token)
		  session[:user] = rdio.call('currentUser')['result']
		end
		redirect_to('/new')
	end

	def logout
  		session.clear
  		redirect_to ('/')
	end

	def new_party
		new_party = params.require(:create).permit(:playlist, :reuse)
	end

	def nuke
		rdio = Host.rdio_init params[:id]
		playlists = []
		temp = rdio.call('getPlaylists')['result']['owned']
		temp.each_with_index do |v, i|
			playlists << temp[i]['key']
		end
		temp.each_with_index do |v ,i|
			rdio.call('deletePlaylist', ({ playlist: playlists[i] }))
		end
		redirect_to ('/')
	end

	def access_token
		session[:at]
	end

	def access_token_secret
		session[:ats]
	end

	def has_access_token?
		access_token
	end

	def join
		redirect_to Host.party
	end
end
