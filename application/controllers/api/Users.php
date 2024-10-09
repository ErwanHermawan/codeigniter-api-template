<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Users extends RestController {
	
	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		cross_origin();
	}
	
	public function index_get()
	{
		$token = $this->input->get_request_header('Authorization');
		$id = $this->get('id');
		
		if (!$token) {
			return $this->response(['status' => false, 'message' => 'Authorization token is missing'], RestController::HTTP_UNAUTHORIZED);
		}
		
		// Decode JWT token
		$decoded = decode_jwt($token);
		if (!$decoded) {
			return $this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}

		// If 'id' is provided, fetch the specific user's data
		if ($id !== null) {
			$this->handle_single_user($id);
			return; // Exit after processing single user
		}

		// Sanitize and validate DataTable inputs
		$draw = $this->get('draw');
		$start = sanitize($this->get('start'));
		$limit = sanitize($this->get('length'));
		$search = htmlspecialchars($this->get('search')['value'] ?? '');

		// If request is for DataTable, handle accordingly
		if ($draw !== null && $start !== null && $limit !== null && $search !== null) {
			$this->handle_datatable_request($draw, $start, $limit, $search);
		} else {
			// Otherwise, Handle default request (paginated data)
			$this->handle_default_request($limit, $start, $search);
		}
	}
	
	// Handle datatable request
	private function handle_datatable_request($draw, $start, $limit, $search)
	{
		// Search and filtering logic
		$config = [
			'table' => 'tb_users',
			'search' => ['first_name' => $search],
			'sorting' => ['field' => 'user_id', 'order' => 'ASC'],
			'output_data' => 'num_rows'
		];
		$total_row = $this->global_model->get_data($config);;
		$data = $this->get_user_data($limit, $start, $search);
		
		$o_data = [];
		$timestamp = date('ms'); // Cache the timestamp once for the loop
		
		foreach ($data as $val) {
			$photo = $val['photo'] ? $val['photo'] . '?dt=' . $timestamp : 'default.jpg?dt=' . $timestamp;
			$path = FILES . 'users/' . $photo;
			
			$o_data[] = [
				render_checkbox($val['user_id']),
				render_image($path),
				$val['first_name'] ?? '',
				$val['username'] ?? '',
				$val['role'] ?? '',
				render_active_status($val['status']),
				render_action_button($val['user_id'], ['edit', 'delete'])
			];
		}
		
		$result = [
			"draw" => $draw,
			"recordsTotal" => $total_row,
			"recordsFiltered" => $total_row,
			"data" => $o_data
		];
		
		echo json_encode($result);
		exit();
	}
	
	// Handle default request (paginated data)
	private function handle_default_request($limit, $start, $search)
	{
		$data = $this->get_user_data($limit, $start, $search);
		if ($data !== null) {
			api_print('Get data successfully', true, 200, $data);
		} else {
			api_print('No such user found', false, 404);
		}
	}
	
	// Handle single user retrieval
	private function handle_single_user($id)
	{
		$data = $this->global_model->get_single_data('tb_users', 'user_id', $id);
		if ($data !== null) {
			api_print('Get data successfully', true, 200, $data);
		} else {
			api_print('No such user found', false, 404);
		}
	}
	
	// Get paginated user data
	private function get_user_data($limit, $start, $search)
	{
		$config = [
			'table' => 'tb_users',
			'search' => ['first_name' => $search],
			'sorting' => ['field' => 'user_id', 'order' => 'ASC'],
			'limit' => $limit,
			'ofset' => $start
		];
		
		return $this->global_model->get_data($config);
	}
	
	// Add User
	public function index_post() {
		$token = $this->input->get_request_header('Authorization');
		
		// Check if Authorization token is provided
		if (!$token) {
			return $this->response(['status' => false, 'message' => 'Authorization token is missing'], RestController::HTTP_UNAUTHORIZED);
		}
		
		// Decode JWT token and check for validity
		$decoded = decode_jwt($token);
		if (!$decoded) {
			return $this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}

		// Validate required fields
		$required_fields = ['name', 'username', 'password', 'role'];
		foreach ($required_fields as $field) {
			if ($this->post($field) === null) {
				return api_print('Missing required field: ' . ucfirst($field), false, 400);
			}
		}

		// Collect input data
		$data_collection = ['name', 'username', 'phone', 'role', 'status'];
		$data = data_collection_add($data_collection);

		// Add password to the collected data
		$data['password'] = password_hash($this->post('password'), PASSWORD_DEFAULT);

		// Insert data into the database
		$result = $this->global_model->add('tb_users', $data);

		// Response handling
		if ($result) {
			return api_print('User added successfully.', true, 200, $data);
		} else {
			return api_print('Failed to add user.', false, 500);
		}
	}
}
