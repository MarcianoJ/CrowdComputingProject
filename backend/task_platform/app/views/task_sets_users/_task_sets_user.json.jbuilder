json.extract! task_sets_user, :id, :task_set_id, :user_id, :created_at, :updated_at
json.url task_sets_user_url(task_sets_user, format: :json)
