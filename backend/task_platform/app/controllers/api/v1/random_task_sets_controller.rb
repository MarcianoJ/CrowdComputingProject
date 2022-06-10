class Api::V1::RandomTaskSetsController < Api::V1::ApplicationController
  # Input
  # - user_id
  # - random_seed (optional)
  # - nlp_kind (optional, one of ['sentiment_analysis', 'textual_entailment'])
  # - task_id (optional)
  #
  # Output:
  # - random task_set for user
  def show
    random_seed = params[:random_seed] || rand(0...1_000_000_000)
    Random.srand(random_seed)

    # tasks = Task.all
    # tasks = tasks.where(nlp_kind: params[:nlp_kind]) if params[:nlp_kind].present?

    task_sets = current_user.task_sets.includes(:task).unfinished_for_user(current_user)
    task_sets = task_sets.where(tasks: { nlp_kind: params[:nlp_kind] }).group('tasks.id').select('tasks.*') if params[:nlp_kind].present?
    task_sets = task_sets.where(task_id: params[:task_id]) if params[:task_id].present?

    random_task_set = task_sets.to_a.uniq.sample
    data_point_count = random_task_set&.data_points&.count.to_i

    random_task_set_attributes = random_task_set&.attributes&.merge({ data_point_count: data_point_count })
    
    render json: random_task_set_attributes || {}, status: :ok
  end
end
