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
	if(randColour2 === randColour) {
		randColour2 = colours[Math.floor(Math.random()*colours.length)];
	}
	$('.newParty').css('background-color', randColour);
	$('.join').css('background-color', randColour2);

});
