require "test_helper"

class ClassificationOptionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @classification_option = classification_options(:one)
  end

  test "should get index" do
    get classification_options_url
    assert_response :success
  end

  test "should get new" do
    get new_classification_option_url
    assert_response :success
  end

  test "should create classification_option" do
    assert_difference('ClassificationOption.count') do
      post classification_options_url, params: { classification_option: { dataset_id: @classification_option.dataset_id, name: @classification_option.name } }
    end

    assert_redirected_to classification_option_url(ClassificationOption.last)
  end

  test "should show classification_option" do
    get classification_option_url(@classification_option)
    assert_response :success
  end

  test "should get edit" do
    get edit_classification_option_url(@classification_option)
    assert_response :success
  end

  test "should update classification_option" do
    patch classification_option_url(@classification_option), params: { classification_option: { dataset_id: @classification_option.dataset_id, name: @classification_option.name } }
    assert_redirected_to classification_option_url(@classification_option)
  end

  test "should destroy classification_option" do
    assert_difference('ClassificationOption.count', -1) do
      delete classification_option_url(@classification_option)
    end

    assert_redirected_to classification_options_url
  end
end
