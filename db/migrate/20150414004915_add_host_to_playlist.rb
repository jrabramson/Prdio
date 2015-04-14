class AddHostToPlaylist < ActiveRecord::Migration
  def change
    add_reference :playlists, :host, index: true
    add_foreign_key :playlists, :hosts
  end
end
