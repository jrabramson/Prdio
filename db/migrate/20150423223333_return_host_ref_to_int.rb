class ReturnHostRefToInt < ActiveRecord::Migration
  def change
  	change_column :guests, :host_id, :int
  end
end
