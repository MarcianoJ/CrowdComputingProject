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
    data_points_task_set = task_set.data_points_task_sets.find_by(data_point_id: (data_point_id.to_i + 1)..)
    data_point = data_points_task_set&.data_point

    previous_data_points_task_sets = task_set.data_points_task_sets.where(id: ..(data_points_task_set&.id.to_i - 1))
    next_data_points_task_sets = task_set.data_points_task_sets
        .where(id: (data_points_task_set&.id.to_i + 1)..)
        .where.not(id: data_points_task_set&.id)

    previous_data_points = previous_data_points_task_sets.to_a.compact.map(&:data_point).compact.uniq
    next_data_points = next_data_points_task_sets.to_a.compact.map(&:data_point).compact.uniq

    output = (data_point&.attributes || {}).merge({
      previous_data_point_count: (previous_data_points&.length || 0),
      next_data_point_count: (next_data_points&.length || 0)
    })

    render json: output, status: :ok
  end
end
