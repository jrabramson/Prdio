class AddRoomToHost < ActiveRecord::Migration
  def change
    add_column :hosts, :room, :string
  end
end
