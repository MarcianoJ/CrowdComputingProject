require "application_system_test_case"

class DataPointsTaskSetsTest < ApplicationSystemTestCase
  setup do
    @data_points_task_set = data_points_task_sets(:one)
  end

  test "visiting the index" do
    visit data_points_task_sets_url
    assert_selector "h1", text: "Data Points Task Sets"
  end

  test "creating a Data points task set" do
    visit data_points_task_sets_url
    click_on "New Data Points Task Set"

    fill_in "Data point", with: @data_points_task_set.data_point_id
    fill_in "Task set", with: @data_points_task_set.task_set_id
    click_on "Create Data points task set"

    assert_text "Data points task set was successfully created"
    click_on "Back"
  end

  test "updating a Data points task set" do
    visit data_points_task_sets_url
    click_on "Edit", match: :first

    fill_in "Data point", with: @data_points_task_set.data_point_id
    fill_in "Task set", with: @data_points_task_set.task_set_id
    click_on "Update Data points task set"

    assert_text "Data points task set was successfully updated"
    click_on "Back"
  end

  test "destroying a Data points task set" do
    visit data_points_task_sets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Data points task set was successfully destroyed"
  end
end
