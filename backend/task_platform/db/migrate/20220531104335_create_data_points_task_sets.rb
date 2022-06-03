class CreateDataPointsTaskSets < ActiveRecord::Migration[6.1]
  def change
    create_table :data_points_task_sets do |t|
      t.belongs_to :data_point, null: false, foreign_key: true
      t.belongs_to :task_set, null: false, foreign_key: true

      t.timestamps
    end
  end
end
