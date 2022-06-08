# == Schema Information
#
# Table name: datasets
#
#  id            :bigint           not null, primary key
#  name          :string
#  gold_standard :boolean          default(FALSE), not null
#  task_id       :bigint           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require "test_helper"

class DatasetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
