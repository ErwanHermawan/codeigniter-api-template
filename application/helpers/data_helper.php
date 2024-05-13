<?php

use chriskacerguis\RestServer\RestController;

if (!function_exists('data_collection')) {
  function data_collection($data_collection) {
    $data = [];
    foreach ($data_collection as $v) {
      $data += [ $v => $_POST[$v]];
    };

    return $data;
  }
}

if (!function_exists('data_collection_put')) {
  function data_collection_put($data_collection_put) {
    $ci =& get_instance();
    $data = [];
    foreach ($data_collection_put as $v) {
      if (!empty($ci->put($v))) {
        $data += [ $v => $ci->put($v)];
      } else {
        $data += [ $v => ''];
      }
    };
    return $data;
  }
}

if (!function_exists('data_collection_add')) {
  function data_collection_add($data_collection, $user_created = true) {
    $ci =& get_instance();
    $data = data_collection($data_collection);

		if($user_created)
		{
			$data += [
				'created_by' => $data['user_id'],
				'created_date' => date('Y-m-d H:i:s'),
				'updated_by' => '0',
				'updated_date' => date('Y-m-d H:i:s')
			];
		}

    return $data;
  }
}

if (!function_exists('data_collection_update')) {
  function data_collection_update($data_collection, $api = false, $update = true) {
    $ci =& get_instance();
    if ($api) {
      $data = data_collection_put($data_collection);
			if ($update) {
				$data += [
					'updated_by' => $data['user_id'],
					'updated_date' => date('Y-m-d H:i:s')
				];
			}
    } else {
      $data = data_collection($data_collection);
      if ($update) {
        $data += [
          'updated_by' => $data['user_id'],
          'updated_date' => date('Y-m-d H:i:s')
        ];
      }
    }

    return $data;
  }
}

if (!function_exists('data_message')) {
  function data_message($result, $state='add', $api=false, $data=null) {
    $ci =& get_instance();
    $text = 'ditambahkan!';
    if ($state == 'change') {
      $text = 'diubah!';
    } else if ($state == 'delete') {
      $text = 'dihapus!';
    }

    if ($result)
    {
      $ci->session->set_flashdata('success', 'Data ' . $text . ' successfully');
    }
    else
    {
      $ci->session->set_flashdata('failed', 'Data failed to ' . $state);
    }
    if ($api) {
      if ($data) {
        $o_data = $data;
      } else {
        $o_data = (object) [];
      }
      if ($result)
      {
				$ci->response([
					'message' => 'Data berhasil ' . $text,
          'status' => true,
          'data' => $o_data
				], 200 );
      }
      else
      {
        $ci->response([
          'message' => 'Data gagal ' . $text,
          'status' => false,
        ], 300);
      }
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
	function api_print($message, $status, $code, $data = 0) {
		$ci =& get_instance();

		$config = [
			'message' => $message,
			'status' => $status,
			'code' => $code
		];

		if ($data !== 0) {
			$config += [
				'data' => $data
			];
		}

		$ci->response($config, $code);
	}
}
