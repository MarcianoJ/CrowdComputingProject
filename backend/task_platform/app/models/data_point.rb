class DataPoint < ApplicationRecord
  belongs_to :dataset

  has_many :data_points_task_sets, dependent: :destroy
  has_many :task_sets, through: :data_points_task_sets

  has_many :task_results, dependent: :destroy

  scope :unfinished_for_user, ->(user, task_set){
    joins(:task_sets).left_outer_joins(:task_results)
        .where(task_sets: { id: task_set.id })
        .where(task_results: { id: nil })
        .distinct
  }
end
