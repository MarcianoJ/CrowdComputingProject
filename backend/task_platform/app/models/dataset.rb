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
class Dataset < ApplicationRecord
  belongs_to :task

  has_many :data_points, dependent: :destroy
end
