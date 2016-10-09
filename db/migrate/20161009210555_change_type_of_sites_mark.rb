class ChangeTypeOfSitesMark < ActiveRecord::Migration
  def change
    change_column :sites, :mark, :float, :default => '3'
  end
end
