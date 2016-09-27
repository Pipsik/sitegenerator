class CreateAchivements < ActiveRecord::Migration
  def change
    create_table :achivements do |t|
      t.string :name
      t.text :description

      t.timestamps null: false
    end
  end
end
