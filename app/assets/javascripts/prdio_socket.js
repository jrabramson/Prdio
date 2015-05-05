var __bind = function(fn, me){ 
  return function(){ 
    return fn.apply(me, arguments); 
  }; 
};

jQuery(function() {
  if (/party/i.test(window.location.href)) {
    if ( !(/search/i.test(window.location.href)) && !(/new/i.test(window.location.href))) {
      return window.trackController = new Playlist.Controller($('#switcher').data('uri'), true);
    }
  }
});

window.Playlist = {};

Playlist.User = (function() {
  function User(_at_user_name, _host_id) {
    this.user_name = _at_user_name;
    this.host_id   = _host_id;
    this.serialize = __bind(this.serialize, this);
  }

  User.prototype.serialize = function() {
    return {
      user_name: this.user_name,
      host_id:   this.host_id
    };
  };

  return User;

})();

Playlist.Controller = (function() {
  Controller.prototype.template = function(track) {
    var html;
    track = jQuery.parseJSON(track);
    html = "<li class='track' data-id='"+track.id+"' data-key='"+track.key+"' data-order='0'> <div class='track-arrow'> <img src='"+track.image+"' class='trackIcon'> <div class='trackInfo'> <span class='track-title'>"+track.title+"</span><br> <span class='track-artist'>"+track.artist+"</span><br> Vote: <span class='vote'>0</span> </div> </div>";

    if ($('#guest').val() !== undefined) {
      html +="<div class='like' id='<%= song.id %>'> <form action='/like' accept-charset='UTF-8' data-remote='true' method='post'> <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='58.222px' height='62.814px' viewBox='22.259 3.037 58.222 62.814' enable-background='new 22.259 3.037 58.222 62.814' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' class='vote_btn like_button'> <g> <g> <path d='M75.814,27.704h-14c-2,0-3.703,1.63-3.703,3.704c0,2.074,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704 C79.519,29.333,77.814,27.704,75.814,27.704z'></path> <path d='M59.074,41.63c0,2,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704c0-2.074-1.63-3.704-3.704-3.704H62.703 C60.703,38,59.074,39.63,59.074,41.63z'></path> <path d='M56.26,51.926c0,2,1.629,3.704,3.703,3.704h14c2,0,3.703-1.63,3.703-3.704c0-2.074-1.629-3.704-3.703-3.704h-14 C57.963,48.222,56.26,49.926,56.26,51.926z'></path> <path d='M48.111,62.148c0,2,1.629,3.703,3.703,3.703h14c2,0,3.704-1.629,3.704-3.703s-1.63-3.704-3.704-3.704H51.74 C49.741,58.519,48.111,60.148,48.111,62.148z'></path> </g> <path d='M58.26,36.815c-1.926-1.111-3.186-3.111-3.186-5.408c0-1.111,0.297-2.222,0.814-3.111H44.852V9.037c0-3.333-2.667-6-6-6 c-3.333,0-6.074,2.667-6.074,6v27.185c0,0.148,0,0.296,0,0.444c0,0.148,0,0.296,0,0.445v18.074c0,4.889,4,8.889,8.889,8.889h3.63 C45.148,63.481,45,62.889,45,62.223c0-3.482,2.815-6.297,6.297-6.297h3.333c-0.89-1.111-1.481-2.519-1.481-4 c0-2.814,1.926-5.259,4.444-6c-1.037-1.111-1.704-2.592-1.704-4.296C55.963,39.704,56.852,38,58.26,36.815z'></path> <g> <path d='M29.815,56.666V38.593c0-0.148,0-0.296,0-0.445c0-0.148,0-0.296,0-0.444v-7.778h-7.556v35.556h15.407l0,0 C33.222,64.963,29.815,61.186,29.815,56.666z'></path> </g> </g> </svg> <input type='hidden' name='song' id='song' value='"+track.id+"'> <input type='hidden' name='host_id' id='host_id' value='"+this.user.host_id+"'> </form> <form action='/dislike' accept-charset='UTF-8' data-remote='true' method='post'> <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='58.222px' height='62.814px' viewBox='22.259 3.037 58.222 62.814' enable-background='new 22.259 3.037 58.222 62.814' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' class='vote_btn dislike_button'> <g> <g> <path d='M75.814,27.704h-14c-2,0-3.703,1.63-3.703,3.704c0,2.074,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704 C79.519,29.333,77.814,27.704,75.814,27.704z'></path> <path d='M59.074,41.63c0,2,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704c0-2.074-1.63-3.704-3.704-3.704H62.703 C60.703,38,59.074,39.63,59.074,41.63z'></path> <path d='M56.26,51.926c0,2,1.629,3.704,3.703,3.704h14c2,0,3.703-1.63,3.703-3.704c0-2.074-1.629-3.704-3.703-3.704h-14 C57.963,48.222,56.26,49.926,56.26,51.926z'></path> <path d='M48.111,62.148c0,2,1.629,3.703,3.703,3.703h14c2,0,3.704-1.629,3.704-3.703s-1.63-3.704-3.704-3.704H51.74 C49.741,58.519,48.111,60.148,48.111,62.148z'></path> </g> <path d='M58.26,36.815c-1.926-1.111-3.186-3.111-3.186-5.408c0-1.111,0.297-2.222,0.814-3.111H44.852V9.037c0-3.333-2.667-6-6-6 c-3.333,0-6.074,2.667-6.074,6v27.185c0,0.148,0,0.296,0,0.444c0,0.148,0,0.296,0,0.445v18.074c0,4.889,4,8.889,8.889,8.889h3.63 C45.148,63.481,45,62.889,45,62.223c0-3.482,2.815-6.297,6.297-6.297h3.333c-0.89-1.111-1.481-2.519-1.481-4 c0-2.814,1.926-5.259,4.444-6c-1.037-1.111-1.704-2.592-1.704-4.296C55.963,39.704,56.852,38,58.26,36.815z'></path> <g> <path d='M29.815,56.666V38.593c0-0.148,0-0.296,0-0.445c0-0.148,0-0.296,0-0.444v-7.778h-7.556v35.556h15.407l0,0 C33.222,64.963,29.815,61.186,29.815,56.666z'></path> </g> </g> </svg> <input type='hidden' name='song' id='song' value='"+track.id+"'> <input type='hidden' name='host_id' id='host_id' value='"+this.user.host_id+"'> </form> </div> </li>";
    }
    
    return $(html);
  };

  Controller.prototype.userListTemplate = function(userList) {
    var user, userHtml, _i, _len;
    userHtml = "";
    for (_i = 0, _len = userList.length; _i < _len; _i++) {
      user = userList[_i];
      userHtml = userHtml + ("<li>" + user.user_name + "</li>");
    }
    return $(userHtml);
  };

  function Controller(url, useWebSockets) {
    this.createGuestUser      = __bind(this.createGuestUser, this);
    this.shiftTrackQueue      = __bind(this.shiftTrackQueue, this);
    this.updateUserList       = __bind(this.updateUserList, this);
    this.trackVote            = __bind(this.trackVote, this);
    this.sortTracks           = __bind(this.sortTracks, this);
    this.sendTrack            = __bind(this.sendTrack, this);
    this.newTrack             = __bind(this.newTrack, this);
    this.bindEvents           = __bind(this.bindEvents, this);
    this.resetVote            = __bind(this.resetVote, this);
    this.updateList           = __bind(this.updateList, this);
    this.reconnect            = __bind(this.reconnect);
    this.trackQueue           = [];
    this.dispatcher           = new WebSocketRails(url, useWebSockets);
    this.dispatcher.on_open   = this.createGuestUser;
    this.bindEvents();
  }

  Controller.prototype.bindEvents = function() {
    this.dispatcher.bind('user_list', this.updateUserList);
    this.dispatcher.bind('connection_closed', this.reconnect);
    $('#tracks .track').removeClass('playing-track');
    $('#tracks .track:eq(0)').addClass('playing-track');
    $.post("/reorder",{
      host_id: $('.roomcode').html(),
      authenticity_token:$("meta[name='csrf-token']").attr("content")
    }); 
  };

  Controller.prototype.trackVote = function(track){
    order = jQuery.parseJSON(track.order);
    track = jQuery.parseJSON(track.song);
    $('*[data-id="' + track.id + '"] .vote').html(track.vote);
    current_order = $.map($('.track'), function(el) {
          return $(el).data('key');
    });
    this.sortTracks(current_order, order);
  };

   Controller.prototype.updateList = function(track){
    order = jQuery.parseJSON(track.order);
    current_order = $.map($('.track'), function(el) {
          return $(el).data('key');
    });
    this.sortTracks(current_order, order);
  };

  Controller.prototype.sortTracks = function(arr, sortArr) {
    for (i=0;i<arr.length;i++) {
      $("li[data-key='"+sortArr[i]+"']").attr('data-order', i);
    }
    tinysort($('.track'), {data:'order'});
    $('#tracks .track').removeClass('playing-track');
    $('#tracks .track:eq(0)').addClass('playing-track');
  }

  Controller.prototype.newTrack = function(track) {
    this.appendTrack(track);
  };

  Controller.prototype.sendTrack = function(event) {
    var track;
    event.preventDefault();
    track = $('#search-data').val();
    this.dispatcher.trigger('new_track', {
      user_name: this.user.user_name,
      track_search: track
    });
    return $('#search-data').val('');
  };

  Controller.prototype.resetVote = function(track) {
   $('*[data-id="' + track.song + '"] .vote').html('0');
   $('*[data-id="' + track.song + '"] .like').fadeIn();
  };

  Controller.prototype.updateUserList = function(userList) {
    return $('#user-list').html(this.userListTemplate(userList));
  };

  Controller.prototype.appendTrack = function(track) {
    var trackTemplate;
    trackTemplate = this.template(track);
    $('#tracks').append(trackTemplate);
    return trackTemplate.slideDown(140);
  };

  Controller.prototype.shiftTrackQueue = function() {
    this.trackQueue.shift();
    return $('#tracks li:first').slideDown(100, function() {
      return $(this).remove();
    });
  };

  Controller.prototype.createGuestUser = function() {
    this.user = new Playlist.User($('#guest').val(), $('#host').val());
    channel = this.dispatcher.subscribe('host' + this.user.host_id);
    channel.bind('new_track', this.newTrack);
    channel.bind('track_vote', this.trackVote);
    channel.bind('reset_vote', this.resetVote);
    channel.bind('update_list', this.updateList);
    return this.dispatcher.trigger('new_guest', this.user.serialize());
  };

  Controller.prototype.reconnect = function() {
      var attempts = 1;
      var time = generateInterval(attempts);
      
      setTimeout(function () {
          attempts++;
          console.log('reconnecting...');
          window.trackController = new Playlist.Controller($('#switcher').data('uri'), true);
      }, time);
  };

  function generateInterval (k) {
    var maxInterval = (Math.pow(2, k) - 1) * 1000;
    
    if (maxInterval > 30*1000) {
      maxInterval = 30*1000;
    }
    
    return Math.random() * maxInterval; 
  }

  return Controller;

})();
