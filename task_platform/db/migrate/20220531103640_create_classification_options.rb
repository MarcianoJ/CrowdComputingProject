class CreateClassificationOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :classification_options do |t|
      t.string :name
      t.belongs_to :dataset, null: false, foreign_key: true

      t.timestamps
    end
  end
end
