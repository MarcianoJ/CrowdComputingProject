class AlienStory < ApplicationRecord
  has_many :alien_comments, dependent: :destroy
end
