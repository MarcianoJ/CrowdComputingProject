class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  enum role: [:admin, :user]

  has_many :task_results, dependent: :destroy

  has_many :task_sets_users, dependent: :destroy
  has_many :task_sets, through: :task_sets_users

  before_create :assign_to_all_task_sets

  def public_attributes
    attributes.with_indifferent_access.except('encrypted_password', 'token')
  end

  def assign_to_all_task_sets
    if task_sets.blank?
      self.task_sets = TaskSet.all
    end
  end
end
