class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :users, :url, :image
  end
end
