class Dataset < ApplicationRecord
  belongs_to :task

  has_many :data_points, dependent: :destroy
end
