class Addmissingfields < ActiveRecord::Migration
  def change
  	add_column :playlists, :name, :string
  	add_column :songs, :image, :string
  end
end
