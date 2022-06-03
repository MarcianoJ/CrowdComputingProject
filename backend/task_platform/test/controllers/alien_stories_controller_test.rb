require "test_helper"

class AlienStoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @alien_story = alien_stories(:one)
  end

  test "should get index" do
    get alien_stories_url
    assert_response :success
  end

  test "should get new" do
    get new_alien_story_url
    assert_response :success
  end

  test "should create alien_story" do
    assert_difference('AlienStory.count') do
      post alien_stories_url, params: { alien_story: { name: @alien_story.name } }
    end

    assert_redirected_to alien_story_url(AlienStory.last)
  end

  test "should show alien_story" do
    get alien_story_url(@alien_story)
    assert_response :success
  end

  test "should get edit" do
    get edit_alien_story_url(@alien_story)
    assert_response :success
  end

  test "should update alien_story" do
    patch alien_story_url(@alien_story), params: { alien_story: { name: @alien_story.name } }
    assert_redirected_to alien_story_url(@alien_story)
  end

  test "should destroy alien_story" do
    assert_difference('AlienStory.count', -1) do
      delete alien_story_url(@alien_story)
    end

    assert_redirected_to alien_stories_url
  end
end
