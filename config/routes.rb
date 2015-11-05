Rails.application.routes.draw do
  root to: 'home#index'

  get "/messages" => redirect("/conversations")

  resources :conversations do
    member do
      post :reply
      post :trash
      post :untrash
    end
    collection do
      get :trashbin
      post :empty_trash
    end

    resources :messages do
      member do
        post :new
      end
    end
  end
  
  #get '/sessions/new', to: 'sessions#new'
  resources :sessions, only: [:new, :create]
end
