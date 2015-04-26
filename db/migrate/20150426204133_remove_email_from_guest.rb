class RemoveEmailFromGuest < ActiveRecord::Migration
  def change
  	remove_column :guests, :email
  end
end
