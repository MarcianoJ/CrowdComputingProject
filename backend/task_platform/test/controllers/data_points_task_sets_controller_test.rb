require "test_helper"

class DataPointsTaskSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @data_points_task_set = data_points_task_sets(:one)
  end

  test "should get index" do
    get data_points_task_sets_url
    assert_response :success
  end

  test "should get new" do
    get new_data_points_task_set_url
    assert_response :success
  end

  test "should create data_points_task_set" do
    assert_difference('DataPointsTaskSet.count') do
      post data_points_task_sets_url, params: { data_points_task_set: { data_point_id: @data_points_task_set.data_point_id, task_set_id: @data_points_task_set.task_set_id } }
    end

    assert_redirected_to data_points_task_set_url(DataPointsTaskSet.last)
  end

  test "should show data_points_task_set" do
    get data_points_task_set_url(@data_points_task_set)
    assert_response :success
  end

  test "should get edit" do
    get edit_data_points_task_set_url(@data_points_task_set)
    assert_response :success
  end

  test "should update data_points_task_set" do
    patch data_points_task_set_url(@data_points_task_set), params: { data_points_task_set: { data_point_id: @data_points_task_set.data_point_id, task_set_id: @data_points_task_set.task_set_id } }
    assert_redirected_to data_points_task_set_url(@data_points_task_set)
  end

  test "should destroy data_points_task_set" do
    assert_difference('DataPointsTaskSet.count', -1) do
      delete data_points_task_set_url(@data_points_task_set)
    end

    assert_redirected_to data_points_task_sets_url
  end
end
