class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  enum role: [:admin, :user]

  has_many :task_sets_users, dependent: :destroy
  has_many :task_sets, through: :task_sets_users

  def public_attributes
    attributes.with_indifferent_access.except('encrypted_password', 'token')
  end
end
