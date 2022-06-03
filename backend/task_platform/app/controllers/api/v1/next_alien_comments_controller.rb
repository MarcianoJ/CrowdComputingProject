class Api::V1::NextAlienCommentsController < Api::V1::ApplicationController
  # Input:
  # - alien_story_id
  # - alien_comment_id (from last finished task)
  #
  # Output:
  # - next data_point
  def show
    alien_story = AlienStory.find(params[:alien_story_id])

    alien_comment_id = params[:alien_comment_id]
    alien_comment = alien_story.alien_comments.find_by(id: (alien_comment_id.to_i + 1)..)

    render json: alien_comment&.attributes || {}, status: :ok
  end
end