class TaskSet < ApplicationRecord
  belongs_to :task

  has_many :task_sets_users, dependent: :destroy
  has_many :users, through: :task_sets_users

  has_many :data_points_task_sets, dependent: :destroy
  has_many :data_points, through: :data_points_task_sets

  has_many :task_results, dependent: :destroy
end
