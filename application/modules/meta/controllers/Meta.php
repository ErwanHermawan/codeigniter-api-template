<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Meta extends MX_Controller
{

  // -- __construct
  public function __construct()
  {
    parent::__construct();
  }

  // -- index
  public function index()
  {
    // - template
    template_page('Meta', 'meta', 'meta/view');
  }

  // -- view
  public function view()
  {
    $data = [
      'meta' => $this->global_model->get_single_data('tb_meta', 'meta_id', 1)
    ];

    $this->load->view('index', $data);
  }

  // -- edit
  public function edit($meta_id)
  {
    // - template
    template_page('Edit Meta', 'meta', 'meta/view_edit', $meta_id);
  }

  // -- view edit
  public function view_edit($meta_id)
  {

    $data = [
      'meta' => $this->global_model->get_single_data('tb_meta', 'meta_id', $meta_id)
    ];

    $this->load->view('edit', $data);
  }

	// -- process edit
  public function edit_process()
  {
		// upload files
		$upload_files = [
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
				$exist_data = $this->global_model->get_single_data('tb_meta', 'meta_id', $_POST['meta_id']);
				$field_name = $val->name;
				if ($exist_data->$field_name) {
					// delete image send with (directory name, file name)
					delete_img($val->dir, $exist_data->$field_name);
				}

				// upload image send with (value input file, directory name, id, max_size)
				$upload_img = upload_img($val->name, $val->dir, $_POST['meta_id'], $val->max_size);
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

					$result = $this->global_model->update('tb_meta', $data, 'meta_id', $_POST['meta_id']);
				}
			}
		}

		// field name on db and value name on input form must be same
		$data_collection = ['robots', 'refresh', 'title', 'description', 'keywords', 'author', 'copyright', 'theme_color', 'domain_name', 'site_name', 'site_url', 'twitter_account', 'instagram_account', 'facebook_account', 'youtube_account', 'linkedin_account', 'pinterest_account', 'tiktok_account', 'whatsapp_no'];
		$data = data_collection_update($data_collection);

		$result = $this->global_model->update('tb_meta', $data, 'meta_id', $_POST['meta_id']);
		data_message($result, 'change');
		redirect($this->uri->segment(1));
	}
}
