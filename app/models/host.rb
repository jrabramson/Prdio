class Host < ActiveRecord::Base

	has_one :playlist

	def to_param
	  "#{room}"
	end
end
