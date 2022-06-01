Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :task_sets_users
  resources :task_results
  resources :classification_options
  resources :data_points_task_sets
  resources :task_sets
  resources :tasks
  resources :alien_comments
  resources :alien_stories
  resources :data_points
  resources :datasets
  resources :users

  namespace :api do
    namespace :v1 do
      resources :alien_stories, only: :index
      resource :next_alien_comment, only: :show
      resource :next_data_point, only: :show
      resource :random_task_set, only: :show
      resources :task_results, only: :create
      resources :tasks, only: :index
      resources :users, only: :index
    end
  end

  root to: "home#index"
end
