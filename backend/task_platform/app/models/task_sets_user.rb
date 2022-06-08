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
class TaskSetsUser < ApplicationRecord
  belongs_to :task_set
  belongs_to :user
end
