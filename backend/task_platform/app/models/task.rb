# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint           not null, primary key
#  name               :string
#  nlp_kind           :integer
#  has_custom_options :boolean          default(FALSE), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  multi_input        :boolean          default(FALSE), not null
#
class Task < ApplicationRecord
  has_many :datasets, dependent: :destroy
  has_many :data_points, through: :datasets
  has_many :task_results, dependent: :destroy
  has_many :task_sets, dependent: :destroy
  has_many :classification_options, dependent: :destroy

  enum nlp_kind: [:sentiment_analysis, :textual_entailment]

  def create_task_set_from_data_points(total_amount: 20, gold_standard_amount: 7, dataset: nil, name: nil, tutorial: false)
    TaskSet.create_from_data_points(
      self,
      total_amount: total_amount,
      gold_standard_amount: gold_standard_amount,
      dataset: dataset,
      name: name,
      tutorial: tutorial
    )
  end
end
