Rails.application.routes.draw do
  resources :achivements
  resources :sites
  resources :pages


  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks",:registrations => "users/registrations" }
  resources :users, :only => [:index,:show,:destroy]
  root :to => 'sites#index'
  post '/return' => 'sites#create'
  post '/image' => 'users#profile_photo'
  post '/search' => 'sites#search_data'
  post '/postmodel' => 'pages#create'
  get '/site/:id/pages' => 'sites#pages'
end

