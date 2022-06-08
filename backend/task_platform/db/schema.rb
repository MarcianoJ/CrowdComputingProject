# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_08_095413) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alien_comments", force: :cascade do |t|
    t.string "untranslated"
    t.string "translated"
    t.string "robot_response"
    t.bigint "alien_story_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["alien_story_id"], name: "index_alien_comments_on_alien_story_id"
  end

  create_table "alien_stories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "classification_options", force: :cascade do |t|
    t.string "name"
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_classification_options_on_task_id"
  end

  create_table "data_points", force: :cascade do |t|
    t.text "input"
    t.text "input2"
    t.string "maskable_words", array: true
    t.string "custom_options", array: true
    t.bigint "dataset_id", null: false
    t.string "classification"
    t.string "rationale_words", array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dataset_id"], name: "index_data_points_on_dataset_id"
  end

  create_table "data_points_task_sets", force: :cascade do |t|
    t.bigint "data_point_id", null: false
    t.bigint "task_set_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["data_point_id"], name: "index_data_points_task_sets_on_data_point_id"
    t.index ["task_set_id"], name: "index_data_points_task_sets_on_task_set_id"
  end

  create_table "datasets", force: :cascade do |t|
    t.string "name"
    t.boolean "gold_standard", default: false, null: false
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_datasets_on_task_id"
  end

  create_table "task_results", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "data_point_id", null: false
    t.bigint "task_set_id", null: false
    t.string "classification"
    t.string "masked_words", array: true
    t.string "rationale_words", array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "rationale_words2", array: true
    t.string "free_text_explanation"
    t.index ["data_point_id"], name: "index_task_results_on_data_point_id"
    t.index ["task_set_id"], name: "index_task_results_on_task_set_id"
    t.index ["user_id"], name: "index_task_results_on_user_id"
  end

  create_table "task_sets", force: :cascade do |t|
    t.string "name"
    t.boolean "tutorial"
    t.bigint "task_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["task_id"], name: "index_task_sets_on_task_id"
  end

  create_table "task_sets_users", force: :cascade do |t|
    t.bigint "task_set_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "finished", default: false, null: false
    t.index ["task_set_id"], name: "index_task_sets_users_on_task_set_id"
    t.index ["user_id"], name: "index_task_sets_users_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.integer "nlp_kind"
    t.boolean "has_custom_options", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "multi_input", default: false, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.integer "role", default: 1, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "token"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.boolean "anonymous", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "alien_comments", "alien_stories"
  add_foreign_key "classification_options", "tasks"
  add_foreign_key "data_points", "datasets"
  add_foreign_key "data_points_task_sets", "data_points"
  add_foreign_key "data_points_task_sets", "task_sets"
  add_foreign_key "datasets", "tasks"
  add_foreign_key "task_results", "data_points"
  add_foreign_key "task_results", "task_sets"
  add_foreign_key "task_results", "users"
  add_foreign_key "task_sets", "tasks"
  add_foreign_key "task_sets_users", "task_sets"
  add_foreign_key "task_sets_users", "users"
end
