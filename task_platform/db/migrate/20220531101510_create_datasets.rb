class CreateDatasets < ActiveRecord::Migration[6.1]
  def change
    create_table :datasets do |t|
      t.string :name
      t.integer :nlp_kind

      t.timestamps
    end
  end
end
