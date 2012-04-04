<?php
if(isset($_POST['submit'])) {

	$realname = $_POST['realname'];
	$subject = $_POST['subject'];
	$senderemail = $_POST['senderemail'];
	$message = $_POST['message'];
	$headers = 'From: thebox@bwmeet.co.uk' . "\r\n" .
	   'Reply-To: thebox@bwmeet.co.uk' . "\r\n" .
	   'X-Mailer: PHP/' . phpversion();
	
	$to = "theguys@bwmeet.co.uk";
	
	filter_var($realname, FILTER_SANITIZE_STRING);
	filter_var($subject, FILTER_SANITIZE_STRING);
	filter_var($senderemail, FILTER_SANITIZE_EMAIL);
	filter_var($message, FILTER_SANITIZE_STRING);
		
	$body = "From: $realname\n E-Mail: $senderemail\n Message:\n $message\n";	
		
	mail($to, $subject, $body, $headers);
	
	header("Location: contact.php?message=sent");
	
} else {
	header("Location: contact.php?message=failed");
}
