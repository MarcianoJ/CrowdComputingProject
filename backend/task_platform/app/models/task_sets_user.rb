class TaskSetsUser < ApplicationRecord
  belongs_to :task_set
  belongs_to :user
end
