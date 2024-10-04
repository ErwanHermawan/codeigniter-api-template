<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Auth extends RestController {
	
	public function __construct() {
		parent::__construct();
		cross_origin();
	}
	
	// Endpoint for login to issue JWT
	public function login_post() {
		$username =  $this->security->xss_clean($this->post('username'));
		$password =  $this->security->xss_clean($this->post('password'));
		
		// - query user by username and status
		$user = $this->db
		->where(['username' => $username, 'status' => '1'])
		->get('tb_users')
		->row();
		
		if ($user && password_verify($password, $user->password)) {
			// - log user login
			$user_log = [
				'user_id' => $user->user_id,
				'date_log' => date('Y-m-d H:i:s'),
				'status' => '1',
				'user_ip' => $this->input->ip_address()
			];

			$this->db->insert('tb_users_log', $user_log);
			
			// - generate JWT token
			$token = generate_jwt(['username' => $username]);
			
			// - prepare response data
			$data = [
				'logged_in' => true,
				'user_id' => $user->user_id,
				'full_name' => trim($user->first_name . ' ' . $user->mid_name . ' ' . $user->last_name),
				'photo' => $user->photo,
				'status' => $user->status,
				'role' => $user->role,
				'token' => $token
			];

			// - set session
			$this->session->set_userdata($data);
			
			$this->response(['status' => true, 'data' => $data], RestController::HTTP_OK);
		} else {
			$this->response(['status' => false, 'message' => 'Invalid username or password'], RestController::HTTP_BAD_REQUEST);
		}
	}
}
