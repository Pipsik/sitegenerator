class AddMarkToSites < ActiveRecord::Migration
  def change
    add_column :sites, :mark, :integer
  end
end
