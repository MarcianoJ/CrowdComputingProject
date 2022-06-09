# == Schema Information
#
# Table name: data_points_task_sets
#
#  id            :bigint           not null, primary key
#  data_point_id :bigint           not null
#  task_set_id   :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class DataPointsTaskSet < ApplicationRecord
  belongs_to :data_point
  belongs_to :task_set
end
