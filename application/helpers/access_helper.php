<?php
if (!function_exists('access_block')) {
	/**
	* Check if access should be blocked based on user session status.
	*
	* @return bool Returns true if access should be blocked, false otherwise.
	*/
	function access_block() {
		$ci =& get_instance();
		
		// Check if the user status is not '1' (assuming '1' means access is granted)
		return $ci->session->userdata('status') !== '1';
	}
}
