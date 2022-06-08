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
require "test_helper"

class DataPointsTaskSetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
