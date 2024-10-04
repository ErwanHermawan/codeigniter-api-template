<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Users extends MX_Controller {
	public function __construct() {
		parent::__construct();
	}

	// -- index
	public function index() {
		// - template
		template_page('Users', 'users', 'users/view'); }

	// -- view
	public function view()
	{
		$data = [
      'user_list' => $this->global_model->get_data('tb_users')
    ];

		$this->load->view('index', $data);
	}
}
