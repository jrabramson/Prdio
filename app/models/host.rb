class Host < ActiveRecord::Base

	has_one :playlist
	has_many :guests

	def to_param
	  "#{room}"
	end
end
