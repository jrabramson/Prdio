class FeedController < WebsocketRails::BaseController
	include ActionView::Helpers::SanitizeHelper

	def initialize_session
		puts "Session Initialized\n"
	end
	
	def client_connected

	end

	def new_track
		rdio = rdio_init
		@host.room = connection_store[:host][:host_id]
		@songs = rdio.call('search', ({ "query" => message[:track_search], "types" => "Track" }))['result']['results']
		html = render_to_string(:partial => 'songs/search', 
		                    	:formats=>["html"],:layout=>false,
		                  		:locals => {songs: @songs})
	    respond_to do |f|
	    	f.json { render :json => { :html => html }, :layout => false }
		end
	end

	def new_guest
	    connection_store[:user] = { user_name: sanitize(message[:user_name]) }
	    connection_store[:host] = { host_id:   sanitize(message[:host_id])   }
        broadcast_user_list
	end

	def delete_user
		
	end

	def song_like
 		host = current_host
 		song = Song.find_by_id message[:song]
 		guest = Guest.find_by(id: session['guest_id'])
 		guest.like(song)
 		guest.songs << song
 		if song.save
 			WebsocketRails['host' + host.id.to_s].trigger :like_track, { song: song.id }
			reorder_playlist
		else
 			users = connection_store.collect_all(:user)
	 		broadcast_message :resume_play, users			
		end
	end

	def song_dislike
		host = current_host
 		song = Song.find_by_id message[:song]
 		guest = Guest.find_by(id: session['guest_id'])
 		guest.dislike(song)
 		guest.songs << song
 		if song.save
 			WebsocketRails['host' + host.id.to_s].trigger :dislike_track, { song: song.id }
			reorder_playlist
		end
	end

	def clear
		host = current_host
		song = Song.where(key: sanitize(message[:key]), playlist_id: host.playlist.id)[0]
		song.vote = 0
		song.save
		WebsocketRails['host' + song.playlist.host.id.to_s].trigger :reset_vote, { song: song.id.to_json }
		head :ok
	end

	def reorder_playlist
		host = current_host
		rdio = rdio_init
		rdio.set_playlist_order host
		# WebsocketRails['host' + host.id.to_s].trigger :resume_play, { host_id: host.id.to_json }
	end

	def broadcast_user_list
	  users = connection_store.collect_all(:user)
	  broadcast_message :user_list, users
	end

	def rdio_init
		access_token = current_host.at
	  	access_token_secret = current_host.ats
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end

	def current_host
		current_host = Host.find_by_room sanitize(message[:host_id])
	end
end
