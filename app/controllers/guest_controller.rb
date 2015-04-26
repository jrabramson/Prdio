class GuestController < ApplicationController

	def new 
		if Host.find_by_room(guest_params[:host_id])
			@guest = Guest.new({ 
					name: guest_params[:name], 
					host_id: Host.find_by_room(guest_params[:host_id]).id
				})
			if @guest.save
				session[:guest_id] = @guest.id
				redirect_to '/' + params[:guest][:host_id]
			end
		else
			redirect_to '/'
		end
	end

	def guest_params 
		guest_params = params.require(:guest).permit(:host_id, :name) 
	end

end
