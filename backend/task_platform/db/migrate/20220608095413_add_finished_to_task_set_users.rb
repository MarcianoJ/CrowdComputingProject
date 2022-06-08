class AddFinishedToTaskSetUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :task_sets_users, :finished, :boolean, null: false, default: false
  end
end
