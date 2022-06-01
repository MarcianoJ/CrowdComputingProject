require "application_system_test_case"

class TaskResultsTest < ApplicationSystemTestCase
  setup do
    @task_result = task_results(:one)
  end

  test "visiting the index" do
    visit task_results_url
    assert_selector "h1", text: "Task Results"
  end

  test "creating a Task result" do
    visit task_results_url
    click_on "New Task Result"

    fill_in "Classification", with: @task_result.classification
    fill_in "Data points task set", with: @task_result.data_points_task_set_id
    fill_in "Masked words", with: @task_result.masked_words
    fill_in "Rationale words", with: @task_result.rationale_words
    fill_in "Task", with: @task_result.task_id
    fill_in "User", with: @task_result.user_id
    click_on "Create Task result"

    assert_text "Task result was successfully created"
    click_on "Back"
  end

  test "updating a Task result" do
    visit task_results_url
    click_on "Edit", match: :first

    fill_in "Classification", with: @task_result.classification
    fill_in "Data points task set", with: @task_result.data_points_task_set_id
    fill_in "Masked words", with: @task_result.masked_words
    fill_in "Rationale words", with: @task_result.rationale_words
    fill_in "Task", with: @task_result.task_id
    fill_in "User", with: @task_result.user_id
    click_on "Update Task result"

    assert_text "Task result was successfully updated"
    click_on "Back"
  end

  test "destroying a Task result" do
    visit task_results_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Task result was successfully destroyed"
  end
end
