class TaskResult < ApplicationRecord
  belongs_to :user
  belongs_to :data_point
  belongs_to :task_set
end
