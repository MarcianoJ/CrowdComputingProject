require "application_system_test_case"

class AlienCommentsTest < ApplicationSystemTestCase
  setup do
    @alien_comment = alien_comments(:one)
  end

  test "visiting the index" do
    visit alien_comments_url
    assert_selector "h1", text: "Alien Comments"
  end

  test "creating a Alien comment" do
    visit alien_comments_url
    click_on "New Alien Comment"

    fill_in "Alien story", with: @alien_comment.alien_story_id
    fill_in "Robot response", with: @alien_comment.robot_response
    fill_in "Translated", with: @alien_comment.translated
    fill_in "Untranslated", with: @alien_comment.untranslated
    click_on "Create Alien comment"

    assert_text "Alien comment was successfully created"
    click_on "Back"
  end

  test "updating a Alien comment" do
    visit alien_comments_url
    click_on "Edit", match: :first

    fill_in "Alien story", with: @alien_comment.alien_story_id
    fill_in "Robot response", with: @alien_comment.robot_response
    fill_in "Translated", with: @alien_comment.translated
    fill_in "Untranslated", with: @alien_comment.untranslated
    click_on "Update Alien comment"

    assert_text "Alien comment was successfully updated"
    click_on "Back"
  end

  test "destroying a Alien comment" do
    visit alien_comments_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Alien comment was successfully destroyed"
  end
end
