require "application_system_test_case"

class DataPointsTest < ApplicationSystemTestCase
  setup do
    @data_point = data_points(:one)
  end

  test "visiting the index" do
    visit data_points_url
    assert_selector "h1", text: "Data Points"
  end

  test "creating a Data point" do
    visit data_points_url
    click_on "New Data Point"

    fill_in "Classification", with: @data_point.classification
    fill_in "Custom options", with: @data_point.custom_options
    fill_in "Dataset", with: @data_point.dataset_id
    fill_in "Input", with: @data_point.input
    fill_in "Input2", with: @data_point.input2
    fill_in "Maskable words", with: @data_point.maskable_words
    fill_in "Rationale words", with: @data_point.rationale_words
    click_on "Create Data point"

    assert_text "Data point was successfully created"
    click_on "Back"
  end

  test "updating a Data point" do
    visit data_points_url
    click_on "Edit", match: :first

    fill_in "Classification", with: @data_point.classification
    fill_in "Custom options", with: @data_point.custom_options
    fill_in "Dataset", with: @data_point.dataset_id
    fill_in "Input", with: @data_point.input
    fill_in "Input2", with: @data_point.input2
    fill_in "Maskable words", with: @data_point.maskable_words
    fill_in "Rationale words", with: @data_point.rationale_words
    click_on "Update Data point"

    assert_text "Data point was successfully updated"
    click_on "Back"
  end

  test "destroying a Data point" do
    visit data_points_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Data point was successfully destroyed"
  end
end
