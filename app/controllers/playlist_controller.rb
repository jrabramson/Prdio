class PlaylistController < ApplicationController
	 skip_before_action :verify_authenticity_token

	def update
		@playlist = Playlist.find_by_id params[:id]
	    respond_to do |format|
	        format.json { render :json => @playlist.songs }
	    end
	end

end
