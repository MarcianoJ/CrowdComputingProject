class CreateDatasets < ActiveRecord::Migration[6.1]
  def change
    create_table :datasets do |t|
      t.string :name
      t.boolean :gold_standard, null: false, default: false
      t.belongs_to :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
