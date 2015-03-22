class SongController < ApplicationController
	def index
		@test = Rails.configuration.rdio[:key]
	end
end