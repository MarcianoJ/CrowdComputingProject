class Task < ApplicationRecord
  has_many :datasets, dependent: :destroy
  has_many :task_results, dependent: :destroy
  has_many :task_sets, dependent: :destroy
  has_many :classification_options, dependent: :destroy

  enum nlp_kind: [:sentiment_analysis, :textual_entailment]
end
