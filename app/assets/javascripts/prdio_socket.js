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
    html = "<li class='track"+track.id+" track' data-key='"+track.key+"' data-order='0'> <img src='"+track.image+"' class='trackIcon'> <div class='trackInfo'> "+track.title+"<br> "+track.artist+"<br> Vote: <span class='vote'>0</span> </div> </div> <div class='like' id='"+track.id+"'> <form action='/like' accept-charset='UTF-8' data-remote='true' method='post'> <input name='utf8' type='hidden' value='✓'> <input type='submit' name='commit' value='Like' class='like_button'> <input type='hidden' name='song' id='song' value='"+track.id+"'> <input type='hidden' name='host_id' id='host_id' value='"+this.user.host_id+"'> </form> <form action='/dislike' accept-charset='UTF-8' data-remote='true' method='post'> <input name='utf8' type='hidden' value='✓'> <input type='submit' name='commit' value='Dislike' class='dislike_button'> <input type='hidden' name='song' id='song' value='"+track.id+"'> <input type='hidden' name='host_id' id='host_id' value='"+this.user.host_id+"'> </form> </div> </li>"; 
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
    this.createGuestUser    = __bind(this.createGuestUser, this);
    this.shiftTrackQueue    = __bind(this.shiftTrackQueue, this);
    this.updateUserList     = __bind(this.updateUserList, this);
    this.trackVote          = __bind(this.trackVote, this);
    this.sortTracks         = __bind(this.sortTracks, this);
    this.sendTrack          = __bind(this.sendTrack, this);
    this.newTrack           = __bind(this.newTrack, this);
    this.bindEvents         = __bind(this.bindEvents, this);
    this.resetVote          = __bind(this.resetVote, this);
    this.trackQueue         = [];
    this.dispatcher         = new WebSocketRails(url, useWebSockets);
    this.dispatcher.on_open = this.createGuestUser;
    this.bindEvents();
  }

  Controller.prototype.bindEvents = function() {
    this.dispatcher.bind('user_list', this.updateUserList);
  }; 

  Controller.prototype.trackVote = function(track){
    order = jQuery.parseJSON(track.order);
    track = jQuery.parseJSON(track.song);
    $('.track' + track.id + ' .vote').html(track.vote);
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
    $('.track' + track.song + ' .vote').html('0');
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
    return this.dispatcher.trigger('new_guest', this.user.serialize());
  };

  return Controller;

})();
