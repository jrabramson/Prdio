class Host < ActiveRecord::Base

	has_one :playlist
	has_many :guests

	def self.party_setup access_token  
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
                    access_token)
	  	playlists = []
			temp = rdio.call('getPlaylists')['result']['owned']
			temp.each_with_index do |v, i|
				playlists << temp[i]
			end
	  	playlists
	end

	def self.get_auth uri
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]])
		callback_url = (URI.join uri, '/callback').to_s
		url = rdio.begin_authentication(callback_url)
		rdio.token = url
		rdio
	end

	def self.rdio_init id
		host = Host.find_by_room id
		access_token = host.at
	  	access_token_secret = host.ats
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
			access_token)
	end

	def self.party
		party = '/party/' + params[:room]
	end

	def to_param
		"#{room}"
	end
end
