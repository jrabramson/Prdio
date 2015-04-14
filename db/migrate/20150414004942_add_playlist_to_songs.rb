class AddPlaylistToSongs < ActiveRecord::Migration
  def change
    add_reference :songs, :playlist, index: true
    add_foreign_key :songs, :playlists
  end
end
