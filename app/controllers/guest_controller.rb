class GuestController < ApplicationController

	def new
		guest_room = guest_params[:host_id].upcase
		guest_name = guest_params[:name]
		if Host.find_by_room(guest_room)
			@guest = Guest.new({ 
					name: guest_name, 
					host_id: Host.find_by_room(guest_room).id
				})
			if @guest.save
				session.clear
				session[:guest_id] = @guest.id
				redirect_to '/party/' + guest_room
				raise 'hell'
			else
				flash[:error] = "Please enter your name!"
				redirect_to '/'
			end

		else
			redirect_to '/'
		end
	end

	def guest_params
		guest_params = params.require(:guest).permit(:host_id, :name)
	end

end
