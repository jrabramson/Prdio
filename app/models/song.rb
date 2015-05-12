class Song < ActiveRecord::Base
	
	belongs_to :playlist
	has_many :voted_songs
	has_many :guests, through: :voted_songs

	delegate :room, to: :host

	validates :key, :uniqueness => {:scope=>:playlist_id}
end
