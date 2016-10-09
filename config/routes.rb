Rails.application.routes.draw do
  resources :achivements
  resources :sites do
    resources :comments, only:[:index, :create]
  end
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
  get '/site/:id/updatesite' => 'sites#update_pages'
  get '/user/:id/sites' => 'sites#user_sites'
  get '/user/:id/achivements' => 'achivements#achivement'
end

