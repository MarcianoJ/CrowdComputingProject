class AddMultiInputToTasks < ActiveRecord::Migration[6.1]
  def change
    add_column :tasks, :multi_input, :boolean, null: false, default: false
  end
end
