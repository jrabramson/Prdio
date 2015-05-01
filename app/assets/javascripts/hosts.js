$(function() {	
	$('.like_button').click(function() {
		$(this).parent().parent().fadeOut("normal", function() {
    		$(this).remove();
 		});
	});
	$('.dislike_button').click(function() {
		$(this).parent().parent().fadeOut("normal", function() {
    		$(this).remove();
 		});
	});
});
