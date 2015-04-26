class Song < ActiveRecord::Base
	
	belongs_to :playlist
	has_many :voted_songs
	has_many :guests, through: :voted_songs

	def reorder_playlist
		rdio = rdio_init
		@order = []
		self.playlist.songs.each do |song|
			@order << song.key
			@order.sort_by {|song| [song.vote]}.reverse
		end
		rdio.call('setPlaylistOrder', self.playlist.key, @order )
	end

	def rdio_init
		access_token = session[:at]
	  	access_token_secret = session[:ats]
		rdio = Rdio.new([Rails.configuration.rdio[:key], Rails.configuration.rdio[:secret]], [access_token, access_token_secret])
	end

end
