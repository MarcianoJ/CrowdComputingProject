# == Schema Information
#
# Table name: alien_stories
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AlienStory < ApplicationRecord
  has_many :alien_comments, dependent: :destroy
end
