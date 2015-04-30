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

	def broadcast_user_list
	  users = connection_store.collect_all(:user)
	  broadcast_message :user_list, users
	end

	def rdio_init
		@host = Host.find_by_id connection_store[:host][:host_id]
		access_token = @host.at
	  	access_token_secret = @host.ats
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			[access_token, access_token_secret])
	end
end
