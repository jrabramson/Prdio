class Guest < ActiveRecord::Base
	belongs_to :host
	has_many :voted_songs
	has_many :songs, through: :voted_songs

	delegate :room, to: :host

	def like(song)
		song.vote += 1
	end

	def dislike(song)
		if song.vote > 0
			song.vote -= 1
		end
	end
	
	validates :name, presence: true
	validates :host, presence: true
end
