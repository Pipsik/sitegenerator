class RemoveColumns < ActiveRecord::Migration
  def change
    remove_column :pages, :siteId
    add_column :pages, :site_id, :integer
  end
end
