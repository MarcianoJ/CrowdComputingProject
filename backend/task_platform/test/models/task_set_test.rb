# == Schema Information
#
# Table name: task_sets
#
#  id         :bigint           not null, primary key
#  name       :string
#  tutorial   :boolean
#  task_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class TaskSetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
