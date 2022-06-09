# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string
#  role                   :integer          default("user"), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  token                  :string
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  anonymous              :boolean          default(FALSE), not null
#
class User < ApplicationRecord
  UNFINISHED_TASK_SET_AMOUNT = 3.freeze

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  enum role: [:admin, :user]

  has_many :task_results, dependent: :destroy

  has_many :task_sets_users, dependent: :destroy
  has_many :task_sets, through: :task_sets_users

  # after_create :assign_to_all_task_sets
  after_save :assign_to_task_sets
  after_save :set_task_sets_users_finished

  def public_attributes
    attributes.with_indifferent_access
        .except('encrypted_password', 'token')
        .merge({
          unfinished_task_set_count: task_sets.unfinished_for_user(self).distinct.count
        })
  end

  def set_task_sets_users_finished
    return unless user?

    unfinished_task_sets_users = task_sets_users
        .includes(task_set: { data_points: :task_results })
        .where(finished: false)

    unfinished_task_sets_users.each do |task_sets_user|
      task_set = task_sets_user.task_set
      
      if task_set.present? && task_set.data_points.unfinished_for_user(self, task_set).blank?
        task_sets_user&.update!(finished: true)
      end
    end
  end

  # Checks whether user has unfinished task_sets left and create or assign task_sets others
  def assign_to_task_sets
    return unless user?

    pending_task_sets = task_sets.assigned_for_user(self).unfinished_for_user(self).distinct

    if pending_task_sets.length < UNFINISHED_TASK_SET_AMOUNT
      needed_task_set_amount = UNFINISHED_TASK_SET_AMOUNT - pending_task_sets.length

      assignable_task_sets = TaskSet
          .unassigned_for_user(self)
          .by_usage_under_limit

      if assignable_task_sets.length < needed_task_set_amount
        Task.all.each do |task|
          2.times do
            task.create_task_set_from_data_points
          end
        end
      end

      assignable_task_sets = TaskSet
          .unassigned_for_user(self)
          .by_usage_under_limit

      if assignable_task_sets.length < needed_task_set_amount
        assignable_task_sets = TaskSet
          .unassigned_for_user(self)
          .by_usage
      end

      self.task_sets = (task_sets + assignable_task_sets.first(needed_task_set_amount)).compact.uniq
    end
  end

  def assign_to_all_task_sets
    return unless user?

    if task_sets.blank?
      self.task_sets = TaskSet.all
    end
  end
end
