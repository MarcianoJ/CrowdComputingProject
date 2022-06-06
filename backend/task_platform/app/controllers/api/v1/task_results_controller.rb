class Api::V1::TaskResultsController < Api::V1::ApplicationController
  # Input:
  # - task_set_id
  # - data_point_id
  # - classification
  # - rationale_words
  #
  # Output:
  # - next data_point
  def create
    @task_result = current_user.task_results.new(task_result_params)

    if @task_result.save
      render json: { success: true }, status: :ok
    else
      render json: { errors: @task_result.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def task_result_params
    params.permit(
      :task_set_id,
      :data_point_id,
      :classification,
      rationale_words: []
    )
  end
end
