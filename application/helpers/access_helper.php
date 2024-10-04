<?php
if (!function_exists('check_auth')) {
	/**
	* Check if access should be blocked based on user session status.
	*
	* @return bool Returns true if access should be blocked, false otherwise.
	*/
	function check_auth() {
		$ci =& get_instance();
		
		// Check if the user status is not '1' (assuming '1' means access is granted)
		if (!$ci->session->userdata('logged_in')) {
			// Redirect to login page if not logged in
			redirect('login');
		}
	}
}
