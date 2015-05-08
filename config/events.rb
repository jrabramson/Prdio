WebsocketRails.setup do |config|

  # Uncomment to override the default log level. The log level can be
  # any of the standard Logger log levels. By default it will mirror the
  # current Rails environment log level.
  # config.log_level = :debug

  # Uncomment to change the default log file path.
  # config.log_path = "#{Rails.root}/log/websocket_rails.log"
  
  # Set to true if you wish to log the internal websocket_rails events
  # such as the keepalive `websocket_rails.ping` event.
  config.log_internal_events = true

  # Change to true to enable standalone server mode
  # Start the standalone server with rake websocket_rails:start_server
  # * Requires Redis
  config.standalone = false

  # Change to true to enable channel synchronization between
  # multiple server instances.
  # * Requires Redis.
  config.synchronize = false

  # Uncomment and edit to point to a different redis instance.
  # Will not be used unless standalone or synchronization mode
  # is enabled.
  # config.redis_options = {:host => 'localhost', :port => '6379'}
end

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
