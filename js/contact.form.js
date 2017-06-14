$(function() {

	"use strict";

	$('.contact-form').on("submit", function(){
		var $this = $(this);
						   
		$('.invalid').removeClass('invalid');						   
		var msg = '请填写信息',
			successMessage = "感谢捧场!!!我会在收到邮件后第一时间联系你的~",
			error = 0,
			pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);


		if ($.trim($('.contact-form input[name="name"]').val()) === '') {error = 1; $this.find('input[name="name"]').addClass('invalid'); msg = msg +  '\n - Name';}
        if (!pattern.test($.trim($('.contact-form input[name="email"]').val()))) {error = 1; $this.find('input[name="email"]').addClass('invalid'); msg = msg +  '\n - Email';}
		if ($.trim($('.contact-form textarea[name="message"]').val()) === '') {error = 1; $this.find('textarea[name="message"]').addClass('invalid'); msg = msg +  '\n - Your Message';}

        if (error){
        	updateTextPopup('ERROR', msg);
        }else{
            var url = 'send_mail.php',
            	name = $.trim($this.find('input[name="name"]').val()),
            	email = $.trim($this.find('input[name="email"]').val()),
            	subject = ($this.find('input[name="subject"]').length)?$.trim($this.find('input[name="subject"]').val()):'',
            	message = $.trim($this.find('textarea[name="message"]').val());

            $.post(url,{'name':name,'email':email,'subject':subject,'message':message},function(data){
	        	updateTextPopup('THANK YOU!', successMessage);
	        	$this.append('<input type="reset" class="reset-button"/>');
	        	$('.reset-button').click().remove();
			});
        }
	  	return false;
	});

	$(document).on('keyup', '.input-wrapper .input', function(){
		$(this).removeClass('invalid');
	});

	function updateTextPopup(title, text){
		$('.simple-text-popup .title').text(title);
		$('.simple-text-popup .text').text(text);
		$('.popup-wrapper').addClass('active');
		$('.simple-text-popup').addClass('active');
	}

});