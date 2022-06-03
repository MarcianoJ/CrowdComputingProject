require "application_system_test_case"

class TaskSetsUsersTest < ApplicationSystemTestCase
  setup do
    @task_sets_user = task_sets_users(:one)
  end

  test "visiting the index" do
    visit task_sets_users_url
    assert_selector "h1", text: "Task Sets Users"
  end

  test "creating a Task sets user" do
    visit task_sets_users_url
    click_on "New Task Sets User"

    fill_in "Task set", with: @task_sets_user.task_set_id
    fill_in "User", with: @task_sets_user.user_id
    click_on "Create Task sets user"

    assert_text "Task sets user was successfully created"
    click_on "Back"
  end

  test "updating a Task sets user" do
    visit task_sets_users_url
    click_on "Edit", match: :first

    fill_in "Task set", with: @task_sets_user.task_set_id
    fill_in "User", with: @task_sets_user.user_id
    click_on "Update Task sets user"

    assert_text "Task sets user was successfully updated"
    click_on "Back"
  end

  test "destroying a Task sets user" do
    visit task_sets_users_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Task sets user was successfully destroyed"
  end
end
