class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  # Override if needed
  def representable_name
    try(:name) || try(:title) || try(:email) || try(:label) || try(:description) || try(:input) || try(:id) || try(:hash)
  end
end
