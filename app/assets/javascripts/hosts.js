$(function() {	
	$(document).ajaxSuccess(function(evt, data, status, xhr){
	  var vote = xhr.vote;
	  $('#vote').html(vote);
	});
});