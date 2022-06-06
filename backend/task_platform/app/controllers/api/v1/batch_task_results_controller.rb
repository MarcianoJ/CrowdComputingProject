class Api::V1::BatchTaskResultsController < Api::V1::ApplicationController
  # Input:
  # - task_results: [
  #   - task_id
  #   - classification
  #   - rationale_words
  #   ]
  #
  # Output:
  # - success
  # - errors
  def create
    errors = []

    ApplicationRecord.transaction do
      params[:task_results].each.with_index do |_, index|
        task_result = current_user.task_results.new(task_result_params(index))

        unless task_result.save
          errors << task_result.errors.full_messages
        end
      end
    end

    if errors.empty?
      render json: { message: 'Success' }, status: :ok
    else
      render json: { errors: errors.flatten }, status: :unprocessable_entity
    end
  end

  protected

  def task_result_params(index)
    params[:task_results][index].permit(
      :task_id,
      :classification,
      :rationale_words,
    )
  end
end
