class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :nlp_kind
      t.boolean :has_custom_options, null: false, default: false

      t.timestamps
    end
  end
end
