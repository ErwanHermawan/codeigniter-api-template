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
		// Users from a data store e.g. database
		$users = [
			['id' => 0, 'name' => 'John', 'email' => 'john@example.com'],
			['id' => 1, 'name' => 'Jim', 'email' => 'jim@example.com'],
		];
		
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
				$draw = intval($this->get('draw'));
				$start = preg_replace("/[^a-zA-Z0-9.]/", '', $this->get('start')); 
				$limit = preg_replace("/[^a-zA-Z0-9.]/", '', $this->get('length')); 
				$search = htmlspecialchars($this->get('search')['value']);

				// Paging settings
				$paging = [
					'start' => $start,
					'limit' => $limit
				];

				// Multi-keyword search
				$multi_keyword = ($search !== "") ? [
					'name' => $search,
					'email' => $search,
				] : null;

				// Get total row count
				$total_row = $this->global_model->get_row('tb_users', null, $multi_keyword);

				// Get paginated data
				$data = $this->global_model->get_data_page('tb_users', null, $multi_keyword, $paging,);

				$o_data = [];
				$i = 1;
				foreach($data->result() as $val) {
					$photo = $val->photo ? $val->photo . '?dt=' . date('ms') : 'default.jpg?dt=' . date('ms');
					
					// Set user status with tooltip
					$status = ($val->status !== '0') 
						? '<span data-toggle="tooltip" data-placement="left" title="Aktif" class="badge badge-success"><i class="mdi mdi-power"></i></span>'
						: '<span data-toggle="tooltip" data-placement="left" title="Tidak Aktif" class="badge badge-danger"><i class="mdi mdi-power"></i></span>';

					$o_data[] = [
						$val->user_id,
						FILES . 'users/' . $photo,
						$val->first_name,
						$val->username,
						$val->role,
						$status,
						$val->user_id
					];
				}

				$result = [
					"draw" => $draw,
					"recordsTotal" => $data->num_rows(),
					"recordsFiltered" => $total_row,
					"data" => $o_data
				];

				// Return result as JSON
				echo json_encode($result);
				exit();
			}
			else
			{
				$data = $this->global_model->get_single_data('tb_users', 'user_id', $id);
				if ( $data !== null )
				{
					// param print api: message, status, code, data
					api_print('Get data successfully', true, 200, $data);
				}
				else
				{
					// param print api: message, status, code, data
					api_print('No such user found', false, 404);
				}
			}
		} else {
			$this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}
	}
}
