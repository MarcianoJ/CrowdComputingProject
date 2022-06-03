class DataPoint < ApplicationRecord
  belongs_to :dataset

  has_many :data_points_task_sets, dependent: :destroy
  has_many :task_sets, through: :data_points_task_sets

  has_many :task_results, dependent: :destroy
end
