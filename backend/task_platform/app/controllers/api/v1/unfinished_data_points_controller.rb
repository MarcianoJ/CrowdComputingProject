class Api::V1::UnfinishedDataPointsController < Api::V1::ApplicationController
  # Input:
  # - task_set_id
  #
  # Output:
  # - unfinished_data_points
  def index
    task_set = TaskSet.find(params[:task_set_id])
    unfinished_data_points = task_set.data_points.unfinished_for_user(current_user, task_set).by_task_set_order
    finished_data_points = task_set.data_points.finished_for_user(current_user, task_set).by_task_set_order

    output = {
      unfinished_data_points: unfinished_data_points.map(&:attributes).shuffle,
      unfinished_data_point_count: unfinished_data_points.count,
      finished_data_point_count: finished_data_points.count
    }

    render json: output, status: :ok
  end
end
