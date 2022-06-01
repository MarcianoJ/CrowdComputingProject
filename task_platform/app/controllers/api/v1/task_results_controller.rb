class Api::V1::RandomTaskSetsController < Api::V1::ApplicationController
  # Input:
  # - user_id
  # - task_id
  # - classification
  # - rationale_words
  #
  # Output:
  # - next data_point
  def create
    user = User.find(params[:user_id])

    @task_result = user.task_results.new(task_result_params)

    if @task_result.save
      render json: { success: true }, status: :ok
    else
      render json: { errors: @task_result.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def task_result_params
    params.permit(
      :user_id,
      :task_id,
      :classification,
      :rationale_words,
    )
  end
end