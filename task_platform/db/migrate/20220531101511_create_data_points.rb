class CreateDataPoints < ActiveRecord::Migration[6.1]
  def change
    create_table :data_points do |t|
      t.text :input
      t.text :input2
      t.string :maskable_words, array: true
      t.string :custom_options, array: true
      t.belongs_to :dataset, null: false, foreign_key: true
      t.string :classification
      t.string :rationale_words, array: true

      t.timestamps
    end
  end
end
