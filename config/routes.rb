Rails.application.routes.draw do

  post 'guests'=> 'guest#new'
  get '/' => 'home#index'
  get 'callback' => 'host#callback'
  get 'new' => 'host#new'
  post 'create' => 'host#create'
  post 'join' => 'host#join'
  post 'like' => 'song#like'
  post 'dislike' => 'song#dislike'
  post 'update' => 'playlist#update'
  get 'logout' => 'host#logout'
  post 'update_playlist' => 'song#update_playlist'
  # post 'clear' => 'feed#clear'
  # post 'reorder' => 'feed#reorder_playlist'

  get 'nuke' => 'host#nuke'

  resources :host, :key => :room, :path => 'party' do
     post 'search' => 'song#search'
     post 'create' => 'song#create'
  end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
