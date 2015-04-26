class Guest < ActiveRecord::Base
	belongs_to :host
	has_many :voted_songs
	has_many :songs, through: :voted_songs

	def like(song)
		song.vote += 1
	end

	def dislike(song)
		song.vote -= 1
	end
	
	validates :name, presence: true
end
