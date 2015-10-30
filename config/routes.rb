Rails.application.routes.draw do
  root 'home#index'

  devise_for :users

  post 'conversations/create_message', to: 'conversations#create_message', as: :conversations_create_message
end
