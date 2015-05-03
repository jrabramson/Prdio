class Song < ActiveRecord::Base
	
	belongs_to :playlist
	has_many :voted_songs
	has_many :guests, through: :voted_songs

	validates :key, :uniqueness => {:scope=>:playlist_id}
end
