class Api::V1::TasksController < Api::V1::ApplicationController
  # Input:
  # - nlp_kind (optional, one of ['sentiment_analysis', 'textual_entailment'])
  #
  # Output:
  # - List of tasks
  def index
    tasks = Task.all
    tasks = tasks.where(nlp_kind: params[:nlp_kind]) if params[:nlp_kind].present?

    output = tasks.map do |task|
      task.attributes.merge({
        classification_options: task.classification_options.map(&:attributes),
        task_set_count: task.task_sets.count
      })
    end

    render json: output, status: :ok
  end
end