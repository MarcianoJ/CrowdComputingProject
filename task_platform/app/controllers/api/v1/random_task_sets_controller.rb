class Api::V1::RandomTaskSetsController < Api::V1::ApplicationController
  # Input
  # - user_id
  # - random_seed (optional)
  #
  # Output:
  # - random task_set for user
  def show
    user_id = params[:user_id]
    user = User.find(user_id)

    random_seed = params[:random_seed] || rand(0...1_000_000_000)
    Random.srand(random_seed)
    
    render json: user.task_sets.sample || {}, status: :ok
  end
end
