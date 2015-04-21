class AddHostRefToGuests < ActiveRecord::Migration
  def change
    add_reference :guests, :host, index: true
    add_foreign_key :guests, :hosts
  end
end
