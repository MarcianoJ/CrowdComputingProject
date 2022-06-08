class Api::V1::AlienStoriesController < Api::V1::ApplicationController
  # Input:
  # - (none)
  #
  # Output:
  # - List of alien_stories
  def index
    output = AlienStory.all.map do |alien_story|
      alien_story.attributes.merge({
        alien_comment_count: alien_story.alien_comments.count
      })
    end

    render json: output, status: :ok
  end
end