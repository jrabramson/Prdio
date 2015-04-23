class ChangeHostIdToString < ActiveRecord::Migration
  def change
  	change_column :guests, :host_id, :string
  end
end
