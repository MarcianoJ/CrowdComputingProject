# == Schema Information
#
# Table name: task_sets_users
#
#  id          :bigint           not null, primary key
#  task_set_id :bigint           not null
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  finished    :boolean          default(FALSE), not null
#
require "test_helper"

class TaskSetsUserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
