$(function() {	
	$('.like_button').click(function() {
		var form = $(this).parents('form:first');
		form.submit();
		$(this).parent().parent().fadeOut("normal", function() {
    		$(this).remove();
 		});
	});
	$('.dislike_button').click(function() {
		var form = $(this).parents('form:first');
		form.submit();
		$(this).parent().parent().fadeOut("normal", function() {
    		$(this).remove();
 		});
	});
});
