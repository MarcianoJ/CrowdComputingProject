json.extract! task_result, :id, :user_id, :task_id, :data_points_task_set_id, :classification, :masked_words, :rationale_words, :created_at, :updated_at
json.url task_result_url(task_result, format: :json)
