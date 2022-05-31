class CreateTaskResults < ActiveRecord::Migration[6.1]
  def change
    create_table :task_results do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :task, null: false, foreign_key: true
      t.belongs_to :data_points_task_set, null: false, foreign_key: true
      t.string :classification
      t.string :masked_words, array: true
      t.string :rationale_words, array: true

      t.timestamps
    end
  end
end
