class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.text :title
      t.integer :siteId
      t.text :content

      t.timestamps null: false
    end
  end
end
