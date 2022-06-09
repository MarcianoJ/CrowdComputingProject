class Api::V1::BatchTaskResultsController < Api::V1::ApplicationController
  # Input:
  # - task_results: [
  #   - task_set_id
  #   - data_point_id
  #   - classification
  #   - rationale_words
  #   - rationale_words2 (only for multi input tasks)
  #   - free_text_explanation (optional)
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
      # task_set = TaskSet.find_by(id: params.dig(:task_results, 0, :task_set_id))
      
      # if task_set.present? && task_set.data_points.unfinished_for_user(current_user, task_set).blank?
      #   task_sets_user = task_set.task_sets_users.find_by(user: current_user)
      #   task_sets_user&.update!(finished: true)
      # end

      current_user.assign_to_task_sets
      current_user.set_task_sets_users_finished

      render json: { message: 'Success' }, status: :ok
    else
      render json: { errors: errors.flatten }, status: :unprocessable_entity
    end
  end

  protected

  def task_result_params(index)
    params[:task_results][index.to_s].permit(
      :task_set_id,
      :data_point_id,
      :classification,
      :free_text_explanation,
      rationale_words: [],
      rationale_words2: []
    )
  end
end
