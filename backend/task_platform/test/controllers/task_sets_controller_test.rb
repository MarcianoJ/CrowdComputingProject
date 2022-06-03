require "test_helper"

class TaskSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_set = task_sets(:one)
  end

  test "should get index" do
    get task_sets_url
    assert_response :success
  end

  test "should get new" do
    get new_task_set_url
    assert_response :success
  end

  test "should create task_set" do
    assert_difference('TaskSet.count') do
      post task_sets_url, params: { task_set: { name: @task_set.name, task_id: @task_set.task_id, tutorial: @task_set.tutorial } }
    end

    assert_redirected_to task_set_url(TaskSet.last)
  end

  test "should show task_set" do
    get task_set_url(@task_set)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_set_url(@task_set)
    assert_response :success
  end

  test "should update task_set" do
    patch task_set_url(@task_set), params: { task_set: { name: @task_set.name, task_id: @task_set.task_id, tutorial: @task_set.tutorial } }
    assert_redirected_to task_set_url(@task_set)
  end

  test "should destroy task_set" do
    assert_difference('TaskSet.count', -1) do
      delete task_set_url(@task_set)
    end

    assert_redirected_to task_sets_url
  end
end
