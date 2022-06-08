# == Schema Information
#
# Table name: alien_comments
#
#  id             :bigint           not null, primary key
#  untranslated   :string
#  translated     :string
#  robot_response :string
#  alien_story_id :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class AlienComment < ApplicationRecord
  belongs_to :alien_story
end
