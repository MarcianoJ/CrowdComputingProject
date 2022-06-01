require "test_helper"

class AlienCommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @alien_comment = alien_comments(:one)
  end

  test "should get index" do
    get alien_comments_url
    assert_response :success
  end

  test "should get new" do
    get new_alien_comment_url
    assert_response :success
  end

  test "should create alien_comment" do
    assert_difference('AlienComment.count') do
      post alien_comments_url, params: { alien_comment: { alien_story_id: @alien_comment.alien_story_id, robot_response: @alien_comment.robot_response, translated: @alien_comment.translated, untranslated: @alien_comment.untranslated } }
    end

    assert_redirected_to alien_comment_url(AlienComment.last)
  end

  test "should show alien_comment" do
    get alien_comment_url(@alien_comment)
    assert_response :success
  end

  test "should get edit" do
    get edit_alien_comment_url(@alien_comment)
    assert_response :success
  end

  test "should update alien_comment" do
    patch alien_comment_url(@alien_comment), params: { alien_comment: { alien_story_id: @alien_comment.alien_story_id, robot_response: @alien_comment.robot_response, translated: @alien_comment.translated, untranslated: @alien_comment.untranslated } }
    assert_redirected_to alien_comment_url(@alien_comment)
  end

  test "should destroy alien_comment" do
    assert_difference('AlienComment.count', -1) do
      delete alien_comment_url(@alien_comment)
    end

    assert_redirected_to alien_comments_url
  end
end
