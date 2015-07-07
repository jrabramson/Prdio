web: bundle exec thin start --threaded -p $PORT

worker: bundle exec thin start -R config.ru -e $RACK_ENV -p $PORT --threaded