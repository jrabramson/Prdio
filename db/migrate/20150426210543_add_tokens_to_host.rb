class AddTokensToHost < ActiveRecord::Migration
  def change
    add_column :hosts, :at, :string
    add_column :hosts, :ats, :string
  end
end
