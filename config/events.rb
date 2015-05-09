WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.
  subscribe :client_connected, to: FeedController, with_method: :client_connected
  subscribe :new_track, to: FeedController, with_method: :new_track
  subscribe :set_host, to: FeedController, with_method: :set_host
  subscribe :new_guest, to: FeedController, with_method: :new_guest
  subscribe :song_like, to: FeedController, with_method: :song_like
  subscribe :song_dislike, to: FeedController, with_method: :song_dislike
  subscribe :reorder_playlist, to: FeedController, with_method: :reorder_playlist
  subscribe :clear, to: FeedController, with_method: :clear
  subscribe :client_disconnected, to: FeedController, with_method: :delete_user
end
