require "application_system_test_case"

class ClassificationOptionsTest < ApplicationSystemTestCase
  setup do
    @classification_option = classification_options(:one)
  end

  test "visiting the index" do
    visit classification_options_url
    assert_selector "h1", text: "Classification Options"
  end

  test "creating a Classification option" do
    visit classification_options_url
    click_on "New Classification Option"

    fill_in "Dataset", with: @classification_option.dataset_id
    fill_in "Name", with: @classification_option.name
    click_on "Create Classification option"

    assert_text "Classification option was successfully created"
    click_on "Back"
  end

  test "updating a Classification option" do
    visit classification_options_url
    click_on "Edit", match: :first

    fill_in "Dataset", with: @classification_option.dataset_id
    fill_in "Name", with: @classification_option.name
    click_on "Update Classification option"

    assert_text "Classification option was successfully updated"
    click_on "Back"
  end

  test "destroying a Classification option" do
    visit classification_options_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Classification option was successfully destroyed"
  end
end
