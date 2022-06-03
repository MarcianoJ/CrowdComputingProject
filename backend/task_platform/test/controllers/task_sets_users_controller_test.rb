require "test_helper"

class TaskSetsUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task_sets_user = task_sets_users(:one)
  end

  test "should get index" do
    get task_sets_users_url
    assert_response :success
  end

  test "should get new" do
    get new_task_sets_user_url
    assert_response :success
  end

  test "should create task_sets_user" do
    assert_difference('TaskSetsUser.count') do
      post task_sets_users_url, params: { task_sets_user: { task_set_id: @task_sets_user.task_set_id, user_id: @task_sets_user.user_id } }
    end

    assert_redirected_to task_sets_user_url(TaskSetsUser.last)
  end

  test "should show task_sets_user" do
    get task_sets_user_url(@task_sets_user)
    assert_response :success
  end

  test "should get edit" do
    get edit_task_sets_user_url(@task_sets_user)
    assert_response :success
  end

  test "should update task_sets_user" do
    patch task_sets_user_url(@task_sets_user), params: { task_sets_user: { task_set_id: @task_sets_user.task_set_id, user_id: @task_sets_user.user_id } }
    assert_redirected_to task_sets_user_url(@task_sets_user)
  end

  test "should destroy task_sets_user" do
    assert_difference('TaskSetsUser.count', -1) do
      delete task_sets_user_url(@task_sets_user)
    end

    assert_redirected_to task_sets_users_url
  end
end
