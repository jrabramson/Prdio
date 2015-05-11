// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require websocket_rails/main
//= require turbolinks
//= require_tree .

$(function() {	

	var colours = ['#FF1D3E', '#FF8A15', '#35D8B9', '#FFBE1D', '#A250CC', '#6945CE', '#F94EA0', '#E24040', '#5983D8', '#5FDB37', '#F76F34']
	randColour = colours[Math.floor(Math.random()*colours.length)];
	randColour2 = colours[Math.floor(Math.random()*colours.length)];
	while(randColour2 === randColour) {
		randColour2 = colours[Math.floor(Math.random()*colours.length)];
	}
	$('.newParty').css('background-color', randColour);
	$('.join').css('background-color', randColour2);
	$('.playlist_create').css('background-color', randColour);
	$('.artistAlbumInfo').css('background-color', randColour2);
	$('.roomcode').css('color', randColour2);
	$('#search').css('background-color', randColour);
	
	$('.error').css('background-color', randColour);
	$(window).load(function(){
	  setTimeout(function(){ $('.error').fadeOut() }, 2500);
	});

	$('.vote_btn').vibrate();

	$('#switcher').css('top', $('.songList').css('height'));	

	// var md = new MobileDetect(window.navigator.userAgent);
	// if (md.mobile()) {
	// 	$('#switcher').css('bottom', $('.songSearch').css('height'));
	// } else {
		$('#switcher').css('bottom', $('.playback-container').css('height'));

	$('#freq').css('height', $('.playback-container').css('height'));

	$('#freq div').each(function(i) {
	  $(this).css('left', ((i+1)*4+7.5) + '%');
	  $(this).css('background-color', colours[i]);
	})

	$('.track').hover(function(){
		randColour3 = colours[Math.floor(Math.random()*colours.length)];
		$(this).first($('.vote')).css('color', randColour3);
	});

	$('.controls svg').on('mouseenter', function(i){
		$(this).css('fill', colours[Math.floor(Math.random()*colours.length)]);
	}).on('mouseleave', function(i){
		$(this).css('fill', '#000');
	});

	
});