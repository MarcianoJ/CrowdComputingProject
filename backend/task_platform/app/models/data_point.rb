# == Schema Information
#
# Table name: data_points
#
#  id                    :bigint           not null, primary key
#  input                 :text
#  input2                :text
#  maskable_words        :string           is an Array
#  custom_options        :string           is an Array
#  dataset_id            :bigint           not null
#  classification        :string
#  rationale_words       :string           is an Array
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  rationale_words2      :string           is an Array
#  free_text_explanation :string
#
class DataPoint < ApplicationRecord
  belongs_to :dataset

  has_many :data_points_task_sets, dependent: :destroy
  has_many :task_sets, through: :data_points_task_sets

  has_many :task_results, dependent: :destroy

  scope :unfinished_for_user, ->(user, task_set){
    joins(:task_sets).left_outer_joins(:task_results)
        .where(task_sets: { id: task_set.id })
        .where(task_results: { id: nil })
        .distinct
  }

  scope :finished_for_user, ->(user, task_set){
    joins(:task_sets).joins(:task_results)
        .where(task_sets: { id: task_set.id })
        .distinct
  }

  scope :by_usage, ->{
    includes(:task_sets)
        .left_outer_joins(:task_sets)
        .group('data_points.id')
        .order('COUNT(task_sets.id)')
        .order('RANDOM()')
        .select('data_points.*')
  }

  scope :with_classification, ->{
    where.not(classification: nil)
  }

  scope :without_classification, ->{
    where(classification: nil)
  }

  scope :with_rationale_words, ->{
    where.not(rationale_words: nil)
        .where.not(rationale_words: [])
  }

  scope :with_rationale_words2, ->{
    where.not(rationale_words2: nil)
        .where.not(rationale_words2: [])
  }

  scope :gold_standard, ->{
    with_classification
        .with_rationale_words
        .with_rationale_words2
  }
end
