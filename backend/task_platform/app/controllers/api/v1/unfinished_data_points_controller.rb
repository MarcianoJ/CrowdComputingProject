class Api::V1::UnfinishedDataPointsController < Api::V1::ApplicationController
  # Input:
  # - task_set_id
  #
  # Output:
  # - unfinished_data_points
  def index
    task_set = TaskSet.find(params[:task_set_id])
    unfinished_data_points = task_set.data_points.unfinished_for_user(current_user, task_set)

    render json: { unfinished_data_points: unfinished_data_points.map(&:attributes).shuffle }, status: :ok
  end
end