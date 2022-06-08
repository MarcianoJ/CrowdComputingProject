class Api::V1::RandomTaskSetsController < Api::V1::ApplicationController
  # Input
  # - user_id
  # - random_seed (optional)
  #
  # Output:
  # - random task_set for user
  def show
    random_seed = params[:random_seed] || rand(0...1_000_000_000)
    Random.srand(random_seed)

    random_task_set = current_user.task_sets.sample
    data_point_count = random_task_set&.data_points.count

    random_task_set_attributes = random_task_set&.attributes&.merge({ data_point_count: data_point_count })
    
    render json: random_task_set_attributes || {}, status: :ok
  end
end
