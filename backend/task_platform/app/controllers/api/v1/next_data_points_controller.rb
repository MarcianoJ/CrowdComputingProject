class Api::V1::NextDataPointsController < Api::V1::ApplicationController
  # Input:
  # - task_set_id
  # - data_point_id (from last finished task)
  #
  # Output:
  # - next data_point
  def show
    data_point_id = params[:data_point_id]

    task_set = TaskSet.find(params[:task_set_id])
    data_point = task_set.data_points.find_by(id: (data_point_id.to_i + 1)..)

    previous_data_points = task_set.data_points.where(id: ..(data_point_id.to_i - 1))
    next_data_points = alien_story.data_points
        .where(id: (data_point_id.to_i + 1)..)
        .where.not(id: data_point&.id)

    output = (data_point&.attributes || {}).merge({
      previous_data_point_count: previous_data_points&.size || 0,
      next_data_point_count: next_data_points&.size || 0
    })

    render json: output, status: :ok
  end
end
