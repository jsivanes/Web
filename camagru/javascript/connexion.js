//the form wrapper (includes all forms)
var $form_wrapper = $('#form_wrapper'),

//the current form is the one with class "active"
$currentForm = $form_wrapper.children('form.active'),
	
//the switch form links
$linkform = $form_wrapper.find('.linkform');

//We’ll get the width and height of each form 
//to store it for later when we want to animate to it:
$form_wrapper.children('form').each(function(i){
	var $theForm = $(this);
	//solve the inline display none problem when using fadeIn/fadeOut
	if(!$theForm.hasClass('active'))
		$theForm.hide();
	$theForm.data({
		width : $theForm.width(),
		height : $theForm.height()
	});
});
//appel de la fonction de redimensionnement pour la formulaire active
setWrapperWidth();
//fonction qui va annimer le changement
$linkform.bind('click',function(e){
	var $link = $(this);
	var target = $link.attr('rel');
	$currentForm.fadeOut(400,function(){
		//remove class "active" from current form
		$currentForm.removeClass('active');
		//new current form
		$currentForm = $form_wrapper.children('form.'+target);
		//animate the wrapper
		$form_wrapper.stop()
					 .animate({
						width : $currentForm.data('width') + 'px',
						height : $currentForm.data('height') + 'px'
					 },500,function(){
						//new form gets class "active"
						$currentForm.addClass('active');
						//show the new form
						$currentForm.fadeIn(400);
					 });
	});
	e.preventDefault();
});

function setWrapperWidth(){
	$form_wrapper.css({
		width : $currentForm.data('width') + 'px',
		height : $currentForm.data('height') + 'px'
	});
}

$form_wrapper.find('input[type="submit"]')
			 .click(function(e){
				e.preventDefault();
			 });