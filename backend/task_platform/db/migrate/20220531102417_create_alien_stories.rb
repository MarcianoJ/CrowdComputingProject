class CreateAlienStories < ActiveRecord::Migration[6.1]
  def change
    create_table :alien_stories do |t|
      t.string :name

      t.timestamps
    end
  end
end
