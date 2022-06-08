class AddRationaleWords2ToTaskResults < ActiveRecord::Migration[6.1]
  def change
    add_column :task_results, :rationale_words2, :string, array: true

    add_column :task_results, :free_text_explanation, :string
  end
end
