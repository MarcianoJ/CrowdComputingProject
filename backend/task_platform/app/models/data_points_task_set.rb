class DataPointsTaskSet < ApplicationRecord
  belongs_to :data_point
  belongs_to :task_set
end
