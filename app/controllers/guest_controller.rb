class GuestController < ApplicationController
	def new
		@guest = Guest.new
	end

	def create
		@guest = Guest.new(params[:id])
	end

	def update
		@guest = Guest.find(params[:id])
		if @guest.update(guest_params)
        	redirect_to '/' + @guest.host.room
    	else
      		render 'new'
    	end
    end
end
