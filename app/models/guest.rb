class Guest < ActiveRecord::Base

	def like(song)
		song.vote = song.vote + 1
	end

	def dislike(song)
		song.vote = song.vote - 1
	end

end
