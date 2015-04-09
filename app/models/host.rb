class Host < ActiveRecord::Base

	has_many :songs

	def to_param
	  "#{room}"
	end
end
