class HostController < ApplicationController
	def new
	  	if has_access_token?
	  		@playlists = Host.party_setup access_token, access_token_secret
	  		@currentUser = session['user']
		else
			session.clear
			rdio = Host.get_auth request.url
			session[:rt] = rdio.token[0]
			session[:rts] = rdio.token[1]
			redirect_to rdio.token[2]
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
	  	access_token_secret = session[:ats]
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
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
		request_token = session[:rt]
		request_token_secret = session[:rts]
		verifier = params[:oauth_verifier]
		if request_token and request_token_secret and verifier
			rdio = Rdio.new([
				Rails.configuration.rdio[:key], 
				Rails.configuration.rdio[:secret]], 
			[request_token, request_token_secret])
			rdio.complete_authentication(verifier)
			session[:at] = rdio.token[0]
			session[:ats] = rdio.token[1]
			session[:user] = rdio.call('currentUser')['result']
			session.delete(:rt)
			session.delete(:rts)
			redirect_to('/new')
		else
			redirect_to('/logout')
		end
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
		access_token && access_token_secret
	end

	def join
		redirect_to Host.party
	end
end
