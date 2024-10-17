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
		$id = $this->get('user_id');
		
		// Validate Authorization token
		if (!validate_token($token)) {
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
			'search' => ['name' => $search],
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
			$role = $val['role'] === '1' ? 'Administrator' : 'Admin';
			
			$o_data[] = [
				render_checkbox($val['user_id']),
				render_image($path),
				$val['name'] ?? '-',
				$val['username'] ?? '-',
				$val['email'] ?? '-',
				$role,
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
		$o_data = [];
		$user_photo = FILES . 'users/' . ($data->photo != null ? $data->photo. '?dt=' .date('ms') : 'default.jpg');
		$role =  $data->role === '1' ? 'Administrator' : 'Admin';
		
		$row['user_id'] = $data->user_id;
		$row['photo'] = $user_photo;
		$row['name'] = $data->name;
		$row['username'] = $data->username;
		$row['email'] = $data->email;
		$row['phone'] = $data->phone;
		$row['role'] = $data->role;
		$row['status'] = $data->status;
		$o_data = $row;
		
		if ($data !== null) {
			api_print('Get data successfully', true, 200, $o_data);
		} else {
			api_print('No such user found', false, 404);
		}
	}
	
	// Get paginated user data
	private function get_user_data($limit, $start, $search)
	{
		$config = [
			'table' => 'tb_users',
			'search' => ['name' => $search],
			'sorting' => ['field' => 'user_id', 'order' => 'DESC'],
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
		
		$user_id = $this->post('user_id');

		if ($user_id === null) {
			// Handle new user creation
			return $this->handle_user_creation();
		} else {
			// Handle user update
			return $this->handle_user_update($user_id);
		}
	}

	/**
	 * Handle user creation process
	 */
	private function handle_user_creation() {
		$required_fields = ['name', 'username', 'password', 'role'];
		if (($validation_result = validation_fields($required_fields, 'POST')) !== true) {
			return $validation_result; // Error response from validation
		}

		// Collect input data
		$data_collection = ['name', 'username', 'email', 'phone', 'role', 'status'];
		$data = data_collection_add($data_collection);

		// Add password to the collected data
		$data['password'] = password_hash($this->post('password'), PASSWORD_DEFAULT);

		// Insert data into the database
		$result = $this->global_model->add('tb_users', $data, true);

		if ($result && !empty($_FILES['photo']['name'])) {
			$upload_img = upload_img('photo', 'users');
			$tmp_file = $upload_img->file_name;
			$this->load->library('upload', $upload_img->config);
			$this->load->library('image_lib');
			$user_id = $result->id;
			$new_file = $user_id . '.' . $upload_img->file_ext;
			
			if($this->upload->do_upload('photo'))
			{
				// update image send with (directory name, temporary file, new file, resize width)
				$update_img = update_img('users', $tmp_file, $new_file, 512);
				$this->image_lib->initialize($update_img);
				$this->image_lib->resize();
				$this->image_lib->clear();
				
				$old_file = 'files/users/' . $tmp_file;
				if (file_exists($old_file)) {
					unlink($old_file);
				}
				
				$data = [
					'photo' => $new_file
				];

				$result = $this->global_model->update('tb_users', $data, 'user_id', $user_id);
			}
		}

		return $result
			? api_print('User added successfully.', true, 200, $data)
			: api_print('Failed to add user.', false, 500);
	}

	/**
	 * Handle user update process
	 */
	private function handle_user_update($user_id) {
		if(!empty($_FILES['photo']['name'])) 
		{
			$exist_data = $this->global_model->get_single_data('tb_users', 'user_id', $user_id);
			if ($exist_data->photo) 
			{
				// delete image send with (directory name, file name)
				delete_img('users', $exist_data->photo);
			}
			
			// upload image send with (value input file, directory name)
			$upload_img = upload_img('photo', 'users', $user_id);
			$file_name = $upload_img->file_name;
			$this->load->library('upload', $upload_img->config);
			
			if($this->upload->do_upload('photo'))
			{
				$this->load->library('image_lib');
				
				// update image send with (directory name, temporary file, new file, resize width)
				$update_img = update_img('users', $file_name, $file_name, 512);
				$this->image_lib->initialize($update_img);
				$this->image_lib->resize();
				$this->image_lib->clear();
				
				$data = [
					'photo' => $file_name
				];
				
				$this->global_model->update('tb_users', $data, 'user_id', $user_id);
			}
		}

		// Collect input data
		$data_collection = ['name', 'username', 'email', 'phone', 'role', 'status'];
		$data = data_collection($data_collection);

		// Hash password if provided
		if ($this->post('password')) {
			$data['password'] = password_hash($this->post('password'), PASSWORD_DEFAULT);
		}

		$data['updated_date'] = date('Y-m-d H:i:s');

		// Update user in the database
		$result = $this->global_model->update('tb_users', $data, 'user_id', $user_id);

		return $result
			? api_print('User updated successfully.', true, 200, $data)
			: api_print('Failed to update user.', false, 500);
	}
	
	public function index_delete() {
		// Get Authorization token from headers
		$token = $this->input->get_request_header('Authorization');
		$user_ids = $this->delete('user_id'); // Can be single or an array of IDs

		// Validate Authorization token
		if (!validate_token($token)) {
			return $this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}

		// Validate presence of user_id
		if (empty($user_ids)) {
			api_print('User ID is required', false, 400);
		}

		// Ensure $user_ids is always an array for uniform handling
		$user_ids = is_array($user_ids) ? $user_ids : [$user_ids];

		// Iterate through each user_id and handle the deletion
		foreach ($user_ids as $user_id) {
			$user = $this->global_model->get_single_data('tb_users', 'user_id', $user_id);
			
			// Check if user exists
			if ($user) {
				// Delete user photo if it exists
				if (!empty($user->photo)) {
					delete_img('users', $user->photo);
				}

				// Delete user from database
				$result = $this->global_model->delete('tb_users', 'user_id', $user_id);

				// Check for deletion failure
				if (!$result) {
					return api_print("Failed to delete user with ID: $user_id", false, 400);
				}
			} else {
				return api_print("User with ID: $user_id not found", false, 404);
			}
		}

		// If all users are deleted successfully
		return api_print('User(s) deleted successfully', true, 200);
	}
	
}
