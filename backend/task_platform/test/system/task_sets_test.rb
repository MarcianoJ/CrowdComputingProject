require "application_system_test_case"

class TaskSetsTest < ApplicationSystemTestCase
  setup do
    @task_set = task_sets(:one)
  end

  test "visiting the index" do
    visit task_sets_url
    assert_selector "h1", text: "Task Sets"
  end

  test "creating a Task set" do
    visit task_sets_url
    click_on "New Task Set"

    fill_in "Name", with: @task_set.name
    fill_in "Task", with: @task_set.task_id
    check "Tutorial" if @task_set.tutorial
    click_on "Create Task set"

    assert_text "Task set was successfully created"
    click_on "Back"
  end

  test "updating a Task set" do
    visit task_sets_url
    click_on "Edit", match: :first

    fill_in "Name", with: @task_set.name
    fill_in "Task", with: @task_set.task_id
    check "Tutorial" if @task_set.tutorial
    click_on "Update Task set"

    assert_text "Task set was successfully updated"
    click_on "Back"
  end

  test "destroying a Task set" do
    visit task_sets_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Task set was successfully destroyed"
  end
end
