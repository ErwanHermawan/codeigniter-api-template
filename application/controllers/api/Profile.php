<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Profile extends RestController {
	
	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		cross_origin();
	}
	
	// Profile Get
	public function index_get()
	{
		$token = $this->input->get_request_header('Authorization');
		$id = $this->get('user_id');
		
		// Validate Authorization token
		if (!validate_token($token)) {
			return $this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}
		
		$data = $this->global_model->get_single_data('tb_users', 'user_id', $id);
		$o_data = [];
		$user_photo = FILES . 'users/' . ($data->photo != null ? $data->photo. '?dt=' .date('ms') : 'default.jpg');
		$role =  $data->role === '1' ? 'Administrator' : 'Admin';
		
		$row['user_id'] = $data->user_id;
		$row['photo'] = $user_photo;
		$row['name'] = $data->name;
		$row['username'] = $data->username;
		$row['email'] = $data->email ?? '-';
		$row['phone'] = $data->phone ?? '-';
		$row['role'] = $data->role;
		$row['status'] = $data->status;
		$row['created_date'] = date('d-m-Y H:i', strtotime($data->created_date));
		$o_data = $row;
		
		if ($data !== null) {
			api_print('Get data successfully', true, 200, $o_data);
		} else {
			api_print('No such user found', false, 404);
		}
	}
	
	// Profile Update
	public function index_put()
  {
		// Get Authorization token from headers
		$token = $this->input->get_request_header('Authorization');
    $user_id = $this->put('user_id');

		// Validate Authorization token
		if (!validate_token($token)) {
			return $this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}

		// Validate presence of user_id
		if ($user_id === null) {
			api_print('User ID is required', false, 400);
		}

		$data_collection = ['name', 'username', 'email', 'phone'];
		$data = data_collection($data_collection, 'PUT');

		$result = $this->global_model->update('tb_users', $data, 'user_id', $user_id);

		if ($result) {
			api_print('Profile updated successfully.', true, 200, $data);

		} else {
			api_print('Failed to update User.', false, 500);
		}
  }
}
