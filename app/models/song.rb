class Song < ActiveRecord::Base
	
	belongs_to :playlist

	def genSong access_token, access_token_secret
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], 
                    [access_token, access_token_secret])
		# get the key of the first playlist and the key of the first song result
		@playlist = rdio.call('getPlaylists')['result']['owned'][0]['key']
		@songParams = rdio.call('search', ({ "query" => title, "types" => "Track" }))['result']['results'][0]
		# add the song to the playlist
		rdio.call('addToPlaylist', ({ "playlist" => @playlist, "tracks" => @songParams['key'] }))
		return @songParams
	end
end
