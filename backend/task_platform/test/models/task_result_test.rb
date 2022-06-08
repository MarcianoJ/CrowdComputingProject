# == Schema Information
#
# Table name: task_results
#
#  id                    :bigint           not null, primary key
#  user_id               :bigint           not null
#  data_point_id         :bigint           not null
#  task_set_id           :bigint           not null
#  classification        :string
#  masked_words          :string           is an Array
#  rationale_words       :string           is an Array
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  rationale_words2      :string           is an Array
#  free_text_explanation :string
#
require "test_helper"

class TaskResultTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
