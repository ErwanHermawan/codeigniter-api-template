<?php

if (!function_exists('fcm_notification')) 
{
	function fcm_notification($token, $title, $message)
	{
		$ci =& get_instance();
		$token_send = json_decode($token); 
		
		$ci->load->library('fcm');
		$ci->fcm->setTitle($title);
		$ci->fcm->setMessage($message);
		$ci->fcm->setIsBackground(false);
		// set payload as null
		$payload = array('notification' => '');
		$ci->fcm->setPayload($payload);
		$ci->fcm->setImage(FILES . 'meta/logo/rzf.svg');
		$json = $ci->fcm->getPush();
		
		/** 
		* Send to multiple
		* 
		* @param array  $token_send     array of firebase registration ids (push tokens)
		* @param array  $json      return data from getPush() method
		*/
		$result = $ci->fcm->sendMultiple($token_send, $json);
		print_r($result);
	}
}
