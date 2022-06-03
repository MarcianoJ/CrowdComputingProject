class CreateAlienComments < ActiveRecord::Migration[6.1]
  def change
    create_table :alien_comments do |t|
      t.string :untranslated
      t.string :translated
      t.string :robot_response
      t.belongs_to :alien_story, null: false, foreign_key: true

      t.timestamps
    end
  end
end
