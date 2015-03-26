class Song < ActiveRecord::Base
	def genSong access_token, access_token_secret
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
                    [access_token, access_token_secret])
		# get the key of the first playlist and the key of the first song result
		@playlist = rdio.call('getPlaylists')['result']['owned'][0]['key']
		@songKey = rdio.call('search', ({ "query" => title, "types" => "Track" }))['result']['results'][0]['key']
		# add the song to the playlist
		rdio.call('addToPlaylist', ({ "playlist" => @playlist, "tracks" => @songKey }))
		return @songKey
	end
end
