$(function() {	
	$('#tracks').on('click', '.like_button', function() {
		var form = $(this).parents('form:first');
		form.submit();
		$(this).parent().parent().fadeOut("normal", function() {
 		});
	});
	$('#tracks').on('click', '.dislike_button', function() {
		var form = $(this).parents('form:first');
		form.submit();
		$(this).parent().parent().fadeOut("normal", function() {
 		});
	});
});
