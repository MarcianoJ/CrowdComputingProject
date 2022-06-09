class AddRationaleWords2ToDataPoints < ActiveRecord::Migration[6.1]
  def change
    add_column :data_points, :rationale_words2, :string, array: true
    add_column :data_points, :free_text_explanation, :string
  end
end
