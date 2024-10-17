<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Users extends MX_Controller {
	public function __construct() {
		parent::__construct();
	}

	// -- index
	public function index() {
		// - template
		template_page('Users', 'users', 'users/view'); 
	}

	// -- view
	public function view()
	{
		$this->load->view('index');
	}

	// -- index
	public function log() {
		// - template
		template_page('User Logs', 'userlog', 'users/view_log'); 
	}

	public function view_log()
	{
		$this->load->view('log');
	}
}
