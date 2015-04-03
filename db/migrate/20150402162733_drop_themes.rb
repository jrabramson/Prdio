class DropThemes < ActiveRecord::Migration
  def change
  	drop_table :themes
  	drop_table :posts
  	drop_table :customposts
  	drop_table :sign_ups
  	drop_table :users
  end
end
