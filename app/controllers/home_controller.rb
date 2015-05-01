class HomeController < ApplicationController
	before_filter :redirect_to_party

	def redirect_to_party
		if session[:host].present?
			redirect_to '/party/' + session[:host]
		elsif session[:guest_id].present?
			redirect_to '/party/' + Guest.find_by(id: session[:guest_id]).room 
		end
	end 

	def index
	@guest = Guest.new
	end
end
