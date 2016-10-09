class AddDefaultValueToUsersMark < ActiveRecord::Migration
  def change
    change_column :sites, :mark, :integer, :default => '3'
  end
end
