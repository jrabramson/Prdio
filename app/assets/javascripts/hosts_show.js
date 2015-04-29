
var __bind = function(fn, me){ 
  return function(){ 
    return fn.apply(me, arguments); 
  }; 
};

jQuery(function() {
  return window.trackController = new Playlist.Controller($('#switcher').data('uri'), true);
});

window.Playlist = {};

Playlist.User = (function() {
  function User(_at_user_name, _host_id) {
    this.user_name = _at_user_name;
    this.host_id   = _host_id
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
    html = track.html
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
    this.createGuestUser = __bind(this.createGuestUser, this);
    this.shiftTrackQueue = __bind(this.shiftTrackQueue, this);
    this.updateUserList = __bind(this.updateUserList, this);
    this.sendTrack = __bind(this.sendTrack, this);
    this.newTrack = __bind(this.newTrack, this);
    this.bindEvents = __bind(this.bindEvents, this);
    this.trackQueue = [];
    this.dispatcher = new WebSocketRails(url, useWebSockets);
    this.dispatcher.on_open = this.createGuestUser;
    this.bindEvents();
  }

  Controller.prototype.bindEvents = function() {
    this.dispatcher.bind('new_track', this.newTrack);
    this.dispatcher.bind('user_list', this.updateUserList);
    $('#search').on('click', this.sendTrack);
    return $('#search-data').keypress(function(e) {
      if (e.keyCode === 13) {
        return $('#search').click();
      }
    });
  };

  Controller.prototype.newTrack = function(track) {
      console.log('sup');
    this.trackQueue.push(track);
      // this.shiftTrackQueue();
    return this.appendTrack(track);
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

  Controller.prototype.updateUserList = function(userList) {
    console.log(userList);
    return $('#user-list').html(this.userListTemplate(userList));
  };

  Controller.prototype.appendTrack = function(track) {
    var trackTemplate;
    trackTemplate = this.template(track);
    $('#switcher').append(trackTemplate);
    return trackTemplate.slideDown(140);
  };

  Controller.prototype.shiftTrackQueue = function() {
    this.trackQueue.shift();
    return $('#stracks li:first').slideDown(100, function() {
      return $(this).remove();
    });
  };

  Controller.prototype.createGuestUser = function() {
    this.user = new Playlist.User($('#guest').val(), $('#host').val());
    return this.dispatcher.trigger('new_guest', this.user.serialize());
  };

  return Controller;

})();
