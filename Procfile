web: bundle exec thin start -p $PORT

worker: bundle exec thin start -R config.ru -e $RACK_ENV -p $PORT --threaded