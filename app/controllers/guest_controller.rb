class GuestController < ApplicationController
	def new 
		@guest = Guest.new(guest_params)
		if @guest.save
			redirect_to '/' + params[:guest][:host_id]
		end
	end

	def guest_params 
		guest_params = params.require(:guest).permit(:host_id, :email, :name) 
	end


end

