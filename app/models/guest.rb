class Guest < ActiveRecord::Base
	belongs_to :host

	def like(song)
		song.vote = song.vote + 1
	end

	def dislike(song)
		song.vote = song.vote - 1
	end

end
