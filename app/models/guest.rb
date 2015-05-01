class Guest < ActiveRecord::Base
	belongs_to :host
	has_many :voted_songs
	has_many :songs, through: :voted_songs

	def like(song)
		if !song.in?(self.songs)
			song.vote += 1
		end
	end

	def dislike(song)
		if !song.in?(self.songs)
			song.vote -= 1
		end
	end
	
	validates :name, presence: true
end
