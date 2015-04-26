class AddDefaultValueToVote < ActiveRecord::Migration
  def change
  	change_column :songs, :vote, :integer, :default => 0
  end
end
