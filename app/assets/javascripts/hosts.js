$(function() {	
	$('.like_button').on('click', function() {
		$(this).parent().parent().fadeOut("normal", function() {
    		$(this).remove();
 		});
	});
	$('.dislike_button').on('click', function() {
		$(this).parent().parent().fadeOut("normal", function() {
    		$(this).remove();
 		});
	});
});
