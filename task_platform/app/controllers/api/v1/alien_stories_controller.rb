class Api::V1::AlienStoriesController < Api::V1::ApplicationController
  # Input:
  # - (none)
  #
  # Output:
  # - List of alien_stories
  def index
    render json: AlienStory.all.map(&:attributes), status: :ok
  end
end