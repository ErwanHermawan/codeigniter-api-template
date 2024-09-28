<?php

use chriskacerguis\RestServer\RestController;

if (!function_exists('data_collection')) {
	/**
	* Collect data from $_POST based on the provided keys.
	*
	* @param array $data_collection Array of keys to collect from $_POST
	* @return array The collected data
	*/
	function data_collection(array $data_collection) {
		$data = [];
		
		foreach ($data_collection as $key) {
			if (isset($_POST[$key])) {
				$data[$key] = $_POST[$key]; // Add only if the POST key exists
			} else {
				$data[$key] = null; // You may decide to set a default value like null
			}
		}
		
		return $data;
	}
}

if (!function_exists('data_collection_put')) {
	/**
	* Collect data from PUT request based on the provided keys.
	*
	* @param array $data_collection_put Array of keys to collect from PUT request
	* @return array The collected data
	*/
	function data_collection_put(array $data_collection_put) {
		$ci =& get_instance();
		$data = [];
		
		foreach ($data_collection_put as $key) {
			// Use ternary operator for cleaner and more efficient key-value assignment
			$data[$key] = !empty($ci->put($key)) ? $ci->put($key) : '';
		}
		
		return $data;
	}
}

if (!function_exists('data_collection_add')) {
	/**
	* Collect data for adding a new entry, including metadata about the creator.
	*
	* @param array $data_collection Array of keys to collect from POST request
	* @param bool $user_created Indicates whether to include creator info
	* @return array The collected data with additional creator metadata if applicable
	*/
	function data_collection_add(array $data_collection, bool $user_created = true) {
		$ci =& get_instance();
		
		// Collect the data from the POST request
		$data = data_collection($data_collection);
		
		// Add metadata if the user_created flag is true
		if ($user_created) {
			$data = array_merge($data, [
				'created_by' => $data['user_id'] ?? null, // Use null if user_id doesn't exist
				'created_date' => date('Y-m-d H:i:s'),
				'updated_by' => '0', // Assuming '0' means not updated by any user yet
				'updated_date' => date('Y-m-d H:i:s')
			]);
		}
		
		return $data;
	}
}

if (!function_exists('data_collection_update')) {
	/**
	* Collect data for updating an entry, including update metadata.
	*
	* @param array $data_collection Array of keys to collect from PUT or POST request
	* @param bool $api Indicates whether the data is coming from an API
	* @param bool $update Indicates whether to include update metadata
	* @return array The collected data with update metadata if applicable
	*/
	function data_collection_update(array $data_collection, bool $api = false, bool $update = true) {
		$ci =& get_instance();
		
		// Collect data based on whether it's from an API or not
		$data = $api ? data_collection_put($data_collection) : data_collection($data_collection);
		
		// Add update metadata if the update flag is true
		if ($update) {
			$data['updated_by'] = $data['user_id'] ?? null; // Use null if user_id doesn't exist
			$data['updated_date'] = date('Y-m-d H:i:s');
		}
		
		return $data;
	}
}

if (!function_exists('data_message')) {
	/**
	 * Set a flash message based on the result of a data operation and optionally return a response for an API.
	 *
	 * @param bool $result Indicates if the operation was successful
	 * @param string $state The state of the operation (add, change, delete)
	 * @param bool $api Indicates whether to return a response for an API
	 * @param mixed $data Optional data to return in the API response
	 */
	function data_message(bool $result, string $state = 'add', bool $api = false, $data = null) {
		$ci =& get_instance();

		// Determine the action text based on the state
		switch ($state) {
			case 'change':
				$action_text = 'diubah!';
				break;
			case 'delete':
				$action_text = 'dihapus!';
				break;
			default:
				$action_text = 'ditambahkan!';
		}

		// Set flash messages based on the operation result
		if ($result) {
			$ci->session->set_flashdata('success', 'Data ' . $action_text . ' successfully');
		} else {
			$ci->session->set_flashdata('failed', 'Data failed to ' . $state);
		}

		// Handle API response if applicable
		if ($api) {
			$o_data = $data ?? (object) []; // Use null coalescing operator (available in PHP 7.4)

			// Create the response message and status based on the result
			$response_message = $result ? 'Data berhasil ' . $action_text : 'Data gagal ' . $action_text;
			$response_status = $result ? true : false;
			$response_code = $result ? 200 : 300;

			// Send the API response
			$ci->response([
				'message' => $response_message,
				'status' => $response_status,
				'data' => $o_data
			], $response_code);
		}
	}
}

if (!function_exists('data_history')) {
	function data_history($data) {
		$ci =& get_instance();
		
		if ($data->created_by != '0') {
			$content = '<div class="card-box">
                    <h4 class="header-title m-t-0 m-b-30">Data History</h4>
                    <ul class="list-group m-b-0 user-list">';
			
			if ($data->updated_by != '0') {
				$update_data = $ci->global_model->get_single_data('tb_users', 'user_id', $data->updated_by);
				$content .= '<li class="list-group-item">
                        <div class="user-list-item">
                            <div class="user-history">
                              <img class="user-history__img" src="' . FILES . 'users/' . ($update_data->photo ? $update_data->photo . '?dt=' .date('ms') : 'default.jpg' ) .'" alt="'.$update_data->first_name . ' ' . $update_data->last_name.'" />
                          </div>
                          <div class="user-desc">
                              <span class="name">'.$update_data->first_name . ' ' . $update_data->last_name.'</span>
                                <span class="desc"><strong>Updated</strong> ' . date_format(date_create($data->updated_date), "F d, Y H:i") . '</span>
                            </div>
                        </div>
                    </li>';
			}
			
			$create_data = $ci->global_model->get_single_data('tb_users', 'user_id', $data->created_by);
			$content .= '<li class="list-group-item">
                      <div class="user-list-item">
                          <div class="user-history">
                              <img class="user-history__img" src="' . FILES . 'users/' . ($create_data->photo ? $create_data->photo . '?dt=' .date('ms') : 'default.jpg' ) . '" alt="'.$create_data->first_name . ' ' . $create_data->last_name.'" />
                          </div>
                          <div class="user-desc">
                              <span class="name">'.$create_data->first_name . ' ' . $create_data->last_name.'</span>
                              <span class="desc"><strong>Created</strong> ' . date_format(date_create($data->created_date), "F d, Y H:i") . '</span>
                          </div>
                      </div>
                  </li>';
			
			$content .= '</ul>
                </div>';
			
			echo $content;
		}
	}
}

if (!function_exists('api_print')) {
	/**
	 * Send a standardized API response.
	 *
	 * @param string $message The message to include in the response
	 * @param bool $status The status of the response (true/false)
	 * @param int $code The HTTP status code for the response
	 * @param mixed $data Optional data to include in the response
	 */
	function api_print($message, $status, $code, $data = null) {
		$ci =& get_instance();
		
		// Prepare the response configuration
		$config = [
			'message' => $message,
			'status' => $status,
			'code' => $code,
		];
		
		// Include data only if it's provided
		if ($data !== null) {
			$config['data'] = $data;
		}
		
		// Send the response
		$ci->response($config, $code);
	}
}
