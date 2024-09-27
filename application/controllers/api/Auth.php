<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Auth extends RestController {
	
	public function __construct() {
		parent::__construct();
		$this->load->helper('jwt_helper'); // Load the JWT helper
	}
	
	// Endpoint for login to issue JWT
	public function login_post() {
		$username = $this->post('username');
		$password = $this->post('password');

		// Example user validation (replace with actual user model)
		if ($username == 'user' && $password == 'password') {
			// Use the helper to generate the JWT
			$token = generate_jwt(['username' => $username]);
			$this->response(['status' => true, 'token' => $token], RestController::HTTP_OK);
		} else {
			$this->response(['status' => false, 'message' => 'Invalid username or password'], RestController::HTTP_BAD_REQUEST);
		}
	}
		
	// Secured endpoint that requires JWT
	public function data_get() {
		$token = $this->input->get_request_header('Authorization');

		if (!$token) {
			$this->response(['status' => false, 'message' => 'Authorization token is missing'], RestController::HTTP_UNAUTHORIZED);
			return;
		}

		// Use the helper to decode the JWT
		$decoded = decode_jwt($token);
		if ($decoded) {
			$this->response(['status' => true, 'message' => 'Authorized access', 'data' => $decoded], RestController::HTTP_OK);
		} else {
			$this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}
	}
}
	