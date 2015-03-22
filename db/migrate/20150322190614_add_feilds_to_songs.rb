class AddFeildsToSongs < ActiveRecord::Migration
  def change
  	add_column :songs, :title, :string
  	add_column :songs, :artist, :string
  	add_column :songs, :vote, :int
  	add_column :songs, :suggested_by, :string
  	add_column :songs, :key, :string
  end
end
