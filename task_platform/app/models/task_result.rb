class TaskResult < ApplicationRecord
  belongs_to :user
  belongs_to :task
  belongs_to :data_points_task_set
end
