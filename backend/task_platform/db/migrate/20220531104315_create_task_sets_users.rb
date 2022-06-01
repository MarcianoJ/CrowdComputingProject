class CreateTaskSetsUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :task_sets_users do |t|
      t.belongs_to :task_set, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
