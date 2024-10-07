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
		$id = $this->get( 'id' );
		
		if (!$token) {
			$this->response(['status' => false, 'message' => 'Authorization token is missing'], RestController::HTTP_UNAUTHORIZED);
			return;
		}
		
		// Use the helper to decode the JWT
		$decoded = decode_jwt($token);
		if ($decoded) {
			if ( $id === null )
			{
				// datatable 
				if (null !== $this->get('draw') && null !== $this->get('start') && null !== $this->get('length') && null !== $this->get('search')) {
					$draw = intval($this->get('draw'));
					$start = preg_replace("/[^a-zA-Z0-9.]/", '', $this->get('start')); 
					$limit = preg_replace("/[^a-zA-Z0-9.]/", '', $this->get('length')); 
					$search = htmlspecialchars($this->get('search')['value']);
	
					// Paging settings
					$paging = ['start' => $start, 'limit' => $limit];
	
					// Multi-keyword search
					$multi_keyword = !empty($search) ? ['name' => $search, 'email' => $search] : null;
	
					// Get total row count
					$total_row = $this->global_model->get_data_page('tb_users', null, $multi_keyword)->num_rows();
	
					// Get paginated data
					$data = $this->global_model->get_data_page('tb_users', null, $multi_keyword, $paging)->result();
	
					$o_data = [];
					$i = 1;
					$timestamp = date('ms'); // Cache the timestamp once for the loop
	
					foreach($data as $val) {
						// Handle the user photo
						$photo = $val->photo ? $val->photo . '?dt=' . $timestamp : 'default.jpg?dt=' . $timestamp;
						$path = FILES . 'users/' . $photo;
	
						// Element rendering
						$checkbox = render_checkbox($val->user_id);
						$image = render_image($path);
						$status = render_active_status($val->status);
						$action_button = render_action_button($val->user_id, ['edit', 'delete']);

						// Append the data row to the array
						$o_data[] = [
							$checkbox,
							$image,
							$val->first_name ?? '',
							$val->username ?? '',
							$val->role ?? '',
							$status,
							$action_button
						];
					}
	
					$result = [
						"draw" => $draw,
						"recordsTotal" => $data,
						"recordsFiltered" => $total_row,
						"data" => $o_data
					];
	
					// Return result as JSON
					echo json_encode($result);
					exit();

				} else {
					$data = $this->global_model->get_data('tb_users');
					if ( $data !== null ) {
						// param print api: message, status, code, data
						api_print('Get data successfully', true, 200, $data);
					} else {
						// param print api: message, status, code, data
						api_print('No such user found', false, 404);
					}
				}
			}
			else
			{
				$data = $this->global_model->get_single_data('tb_users', 'user_id', $id);
				if ( $data !== null ) {
					// param print api: message, status, code, data
					api_print('Get data successfully', true, 200, $data);
				} else {
					// param print api: message, status, code, data
					api_print('No such user found', false, 404);
				}
			}
		} else {
			$this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}
	}
}
