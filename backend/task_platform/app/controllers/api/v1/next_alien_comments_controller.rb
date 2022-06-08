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

    previous_alien_comments = alien_story.alien_comments.where(id: ..(alien_comment_id.to_i - 1))
    next_alien_comments = alien_story.alien_comments
        .where(id: (alien_comment_id.to_i + 1)..)
        .where.not(id: alien_comment&.id)

    output = (alien_comment&.attributes || {}).merge({
      previous_alien_comment_count: previous_alien_comments&.size || 0,
      next_alien_comment_count: next_alien_comments&.size || 0
    })

    render json: output || {}, status: :ok
  end
end