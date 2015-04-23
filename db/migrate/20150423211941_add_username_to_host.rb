class AddUsernameToHost < ActiveRecord::Migration
  def change
  	add_column :hosts, :username, :string
  end
end
