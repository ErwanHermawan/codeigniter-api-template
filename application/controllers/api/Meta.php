<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Meta extends RestController {
	
	public function __construct() {
		parent::__construct();
		cross_origin();
	}
	
	// meta post
	public function index_post()
  {
		// Get Authorization token from headers
		$token = $this->input->get_request_header('Authorization');
    $meta_id = $this->post('meta_id');

		// Validate Authorization token
		if (!validate_token($token)) {
			return $this->response(['status' => false, 'message' => 'Unauthorized access'], RestController::HTTP_UNAUTHORIZED);
		}

		// Validate presence of meta_id
		if ($meta_id === null) {
			api_print('Meta ID is required', false, 400);
		}

		// upload files
		$upload_files = [
			(object) [
				'name' => 'logo',
				'dir' => 'meta/logo',
				'max_size' => '800',
				'width' => 480
			],
			(object) [
				'name' => 'og_image',
				'dir' => 'meta/og',
				'max_size' => '5000',
				'width' => 1200
			],
			(object) [
				'name' => 'twitter_image',
				'dir' => 'meta/twt',
				'max_size' => '5000',
				'width' => 800
			]
		];

		$this->load->library('image_lib');
		$this->load->library('upload');
		foreach ($upload_files as $val) {
			if(!empty($_FILES[$val->name]['name'])) {
				$exist_data = $this->global_model->get_single_data('tb_meta', 'meta_id', $meta_id);
				$field_name = $val->name;
				if ($exist_data->$field_name) {
					// delete image send with (directory name, file name)
					delete_img($val->dir, $exist_data->$field_name);
				}

				// upload image send with (value input file, directory name, id, max_size)
				$upload_img = upload_img($val->name, $val->dir, $meta_id, 'default', $val->max_size);
				$file_name = $upload_img->file_name;
				$this->upload->initialize($upload_img->config);

				if($this->upload->do_upload($val->name))
				{
					// update image send with (directory name, temporary file, new file, resize width)
					$update_img = update_img($val->dir, $file_name, $file_name, $val->width);
					$this->image_lib->initialize($update_img);
					$this->image_lib->resize();
					$this->image_lib->clear();

					$data = [
						$field_name => $file_name
					];

					$result = $this->global_model->update('tb_meta', $data, 'meta_id', $meta_id);
				} else {
					api_print('Data upload failed.', false, 400);
				}
			}
		}

		$data_collection = ['robots', 'refresh', 'title', 'description', 'keywords', 'author', 'copyright', 'theme_color', 'domain_name', 'twitter_account', 'facebook_account', 'instagram_account', 'email_account'];
		$data = data_collection($data_collection);

		$result = $this->global_model->update('tb_meta', $data, 'meta_id', $meta_id);

		if ($result) {
			api_print('Meta updated successfully.', true, 200, $data);

		} else {
			api_print('Failed to update meta.', false, 500);
		}
  }
}
