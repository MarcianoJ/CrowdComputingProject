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
    
    render json: current_user.task_sets.sample || {}, status: :ok
  end
end
