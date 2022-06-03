require "application_system_test_case"

class AlienStoriesTest < ApplicationSystemTestCase
  setup do
    @alien_story = alien_stories(:one)
  end

  test "visiting the index" do
    visit alien_stories_url
    assert_selector "h1", text: "Alien Stories"
  end

  test "creating a Alien story" do
    visit alien_stories_url
    click_on "New Alien Story"

    fill_in "Name", with: @alien_story.name
    click_on "Create Alien story"

    assert_text "Alien story was successfully created"
    click_on "Back"
  end

  test "updating a Alien story" do
    visit alien_stories_url
    click_on "Edit", match: :first

    fill_in "Name", with: @alien_story.name
    click_on "Update Alien story"

    assert_text "Alien story was successfully updated"
    click_on "Back"
  end

  test "destroying a Alien story" do
    visit alien_stories_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Alien story was successfully destroyed"
  end
end
