class PlaylistController < ApplicationController

	def update
		@playlist = Playlist.find_by_id params[:id]
	    respond_to do |format|
	        format.json { render :json => @playlist.songs }
	    end
	end

end
