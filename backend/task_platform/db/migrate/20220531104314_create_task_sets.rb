class CreateTaskSets < ActiveRecord::Migration[6.1]
  def change
    create_table :task_sets do |t|
      t.string :name
      t.boolean :tutorial
      t.belongs_to :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
