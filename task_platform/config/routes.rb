Rails.application.routes.draw do
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
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: "home#index"

  # get 'home', controller: :home
end
