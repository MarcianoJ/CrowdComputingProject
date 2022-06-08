# == Schema Information
#
# Table name: task_sets
#
#  id         :bigint           not null, primary key
#  name       :string
#  tutorial   :boolean
#  task_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class TaskSet < ApplicationRecord
  MIN_REQUIRED_ASSIGNS_FOR_LABEL = 5.freeze

  belongs_to :task

  has_many :task_sets_users, dependent: :destroy
  has_many :users, through: :task_sets_users

  has_many :data_points_task_sets, dependent: :destroy
  has_many :data_points, through: :data_points_task_sets

  has_many :task_results, dependent: :destroy

  scope :by_usage, ->(max_finished = MIN_REQUIRED_ASSIGNS_FOR_LABEL){
    by_usage_under_limit(max_finished).to_a + by_usage_above_limit(max_finished).to_a
  }

  # filter for less than max_finished times finished and order by highest amount of finishes
  scope :by_usage_under_limit, ->(max_finished = MIN_REQUIRED_ASSIGNS_FOR_LABEL){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .group(Arel.sql('task_sets.id'))
        .having(Arel.sql("COUNT(task_sets_users.finished = true) < #{max_finished}"))
        .order(Arel.sql('COUNT(task_sets_users.finished = true) DESC'))
        .order(Arel.sql('COUNT(task_sets_users.id)'))
        .order(Arel.sql('RANDOM()'))
        .select(Arel.sql('task_sets.*'))
        .select(Arel.sql('task_sets.*'))
  }

  # filter for more than max_finished times finished and order by lowest amount of finishes
  scope :by_usage_above_limit, ->(max_finished = MIN_REQUIRED_ASSIGNS_FOR_LABEL){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .group(Arel.sql('task_sets.id'))
        .having(Arel.sql("COUNT(task_sets_users.finished = true) >= #{max_finished}"))
        .order(Arel.sql('COUNT(task_sets_users.finished = true) ASC'))
        .order(Arel.sql('COUNT(task_sets_users.id)'))
        .order(Arel.sql('RANDOM()'))
        .select(Arel.sql('task_sets.*'))
  }

  scope :completed, ->(max_finished = MIN_REQUIRED_ASSIGNS_FOR_LABEL){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .group('task_sets.id')
        .having(Arel.sql("COUNT(task_sets_users.finished = true) >= #{max_finished}"))
        .select('task_sets.*')
  }

  scope :not_completed, ->(max_finished = MIN_REQUIRED_ASSIGNS_FOR_LABEL){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .group('task_sets.id')
        .having(Arel.sql("COUNT(task_sets_users.finished = true) < #{max_finished}"))
        .select('task_sets.*')
  }

  scope :finished, ->{
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .group('task_sets.id')
        .having(Arel.sql("COUNT(task_sets_users.finished = false) = 0"))
        .select('task_sets.*')
  }

  scope :unfinished, ->{
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .group('task_sets.id')
        .having(Arel.sql("COUNT(task_sets_users.finished = false) > 0"))
        .select('task_sets.*')
  }

  scope :unassigned, ->{
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .where(task_sets_users: { id: nil })
  }

  scope :assigned, ->{
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .where.not(task_sets_users: { id: nil })
  }

  scope :finished_for_user, ->(user){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .where(task_sets_users: { user_id: user.id })
        .group('task_sets.id')
        .having(Arel.sql("COUNT(task_sets_users.finished = false) = 0"))
        .select('task_sets.*')
  }

  scope :unfinished_for_user, ->(user){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .where(task_sets_users: { user_id: user.id })
        .group('task_sets.id')
        .having(Arel.sql("COUNT(task_sets_users.finished = false) > 0"))
        .select('task_sets.*')
  }

  scope :unassigned_for_user, ->(user){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .where(task_sets_users: { user_id: user.id })
        .where(task_sets_users: { id: nil })
  }

  scope :assigned_for_user, ->(user){
    includes(:task_sets_users)
        .left_outer_joins(:task_sets_users)
        .where(task_sets_users: { user_id: user.id })
        .where.not(task_sets_users: { id: nil })
  }

  def self.create_from_data_points(task, total_amount: 20, gold_standard_amount: 7, dataset: nil, name: nil, tutorial: false)
    ApplicationRecord.transaction do
      raise 'Task does not belong to dataset' if dataset.present? && dataset&.task != task

      gold_standard_amount = total_amount || gold_standard_amount if tutorial
      candidate_data_points = (dataset || task).data_points.without_classification.by_usage
      gold_standard_data_points = (dataset || task).data_points.gold_standard.by_usage

      if gold_standard_data_points.length < gold_standard_amount
        gold_standard_data_points = (gold_standard_data_points.to_a + (dataset || task).data_points.with_rationale_words.with_classification.to_a).uniq
      end

      if gold_standard_data_points.length < gold_standard_amount
        gold_standard_data_points = (gold_standard_data_points.to_a + (dataset || task).data_points.with_classification.to_a).uniq
      end

      if gold_standard_data_points.length < gold_standard_amount
        # raise "There are less than #{gold_standard_amount} gold_standard datapoints available for task #{task&.name}"
      end

      existing_names = TaskSet.all.pluck(:name).compact.uniq
      generated_name = nil
      name_number = 0

      while (generated_name.blank? || generated_name.in?(existing_names))
        name_number += 1
        generated_name = "#{task.nlp_kind&.to_s || 'task_set'}_#{name_number.to_s.rjust(4, '0')}"
      end

      # generated_name = "#{task.nlp_kind&.to_s || 'task_set'}_#{rand(0...10_000).to_s.rjust(4, '0')}"

      return if gold_standard_data_points.length < gold_standard_amount

      return if candidate_data_points.length + gold_standard_amount < total_amount

      task_set = task.task_sets.create!(tutorial: tutorial, name: (name || generated_name))

      data_points_for_task_set = gold_standard_data_points.first(7) + candidate_data_points.first(total_amount - gold_standard_amount)
      task_set.data_points = data_points_for_task_set.shuffle

      return task_set
    end
  end
end
