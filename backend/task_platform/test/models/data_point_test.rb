# == Schema Information
#
# Table name: data_points
#
#  id                    :bigint           not null, primary key
#  input                 :text
#  input2                :text
#  maskable_words        :string           is an Array
#  custom_options        :string           is an Array
#  dataset_id            :bigint           not null
#  classification        :string
#  rationale_words       :string           is an Array
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  rationale_words2      :string           is an Array
#  free_text_explanation :string
#
require "test_helper"

class DataPointTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
