class Api::V1::TasksController < Api::V1::ApplicationController
  # Input:
  # - (none)
  #
  # Output:
  # - List of tasks
  def index
    output = Task.all.map do |task|
      task.attributes.merge({
        classification_options: task.classification_options.map(&:attributes),
        task_set_count: task.task_sets.count
      })
    end

    render json: output, status: :ok
  end
end