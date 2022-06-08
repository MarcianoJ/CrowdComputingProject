# == Schema Information
#
# Table name: classification_options
#
#  id         :bigint           not null, primary key
#  name       :string
#  task_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ClassificationOption < ApplicationRecord
  belongs_to :task
end
