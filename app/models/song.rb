class Song < ActiveRecord::Base
	def genSong access_token, access_token_secret
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
                    [access_token, access_token_secret])
		@playlist = rdio.call('getPlaylists')['result']['owned'][0]['key']
		@songKey = rdio.call('search', ({ "query" => title, "types" => "Track" }))['result']['results'][0]['key']
		rdio.call('addToPlaylist', ({ "playlist" => @playlist, "tracks" => @songKey }))
		return @songKey
	end
end
