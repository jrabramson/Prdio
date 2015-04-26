$(function() {	
	$(document).ajaxSuccess(function(evt, data, status, xhr){
	  $('#' + xhr.id).remove();
	});
});