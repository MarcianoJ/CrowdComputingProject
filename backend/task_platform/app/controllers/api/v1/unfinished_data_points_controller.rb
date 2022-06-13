class Api::V1::UnfinishedDataPointsController < Api::V1::ApplicationController
  # Input:
  # - task_set_id
  #
  # Output:
  # - unfinished_data_points
  def index
    task_set = TaskSet.find(params[:task_set_id])

    unfinished_data_points = task_set.data_points.unfinished_for_user(current_user, task_set).by_task_set_order.group('data_points_task_sets.id')
    finished_data_points = task_set.data_points.finished_for_user(current_user, task_set).by_task_set_order.group('data_points_task_sets.id')

    # unfinished_data_points = task_set.data_points.unfinished_for_user(current_user, task_set)
    # finished_data_points = task_set.data_points.finished_for_user(current_user, task_set)

    # unfinished_data_points = task_set.data_points
    # finished_data_points = task_set.data_points

    output = {
      unfinished_data_points: unfinished_data_points.map(&:attributes),
      unfinished_data_point_count: unfinished_data_points.length,
      finished_data_point_count: finished_data_points.length
    }

    render json: output, status: :ok
  end
end
