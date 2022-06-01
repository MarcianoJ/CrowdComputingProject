require "test_helper"

class TaskResultsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_result = task_results(:one)
  end

  test "should get index" do
    get task_results_url
    assert_response :success
  end

  test "should get new" do
    get new_task_result_url
    assert_response :success
  end

  test "should create task_result" do
    assert_difference('TaskResult.count') do
      post task_results_url, params: { task_result: { classification: @task_result.classification, data_points_task_set_id: @task_result.data_points_task_set_id, masked_words: @task_result.masked_words, rationale_words: @task_result.rationale_words, task_id: @task_result.task_id, user_id: @task_result.user_id } }
    end

    assert_redirected_to task_result_url(TaskResult.last)
  end

  test "should show task_result" do
    get task_result_url(@task_result)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_result_url(@task_result)
    assert_response :success
  end

  test "should update task_result" do
    patch task_result_url(@task_result), params: { task_result: { classification: @task_result.classification, data_points_task_set_id: @task_result.data_points_task_set_id, masked_words: @task_result.masked_words, rationale_words: @task_result.rationale_words, task_id: @task_result.task_id, user_id: @task_result.user_id } }
    assert_redirected_to task_result_url(@task_result)
  end

  test "should destroy task_result" do
    assert_difference('TaskResult.count', -1) do
      delete task_result_url(@task_result)
    end

    assert_redirected_to task_results_url
  end
end
