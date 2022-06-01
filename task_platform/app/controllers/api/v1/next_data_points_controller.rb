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

    render json: data_point&.attributes || {}, status: :ok
  end
end