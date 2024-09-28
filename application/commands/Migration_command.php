<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_command extends CI_Controller {
	
	public function __construct()
	{
		parent::__construct();  // This will now work since we extend CI_Controller
		$this->load->library('migration');
	}
	
	public function run_migrations()
	{
		if ($this->migration->latest()) {
			echo "Migrations ran successfully\n";
		} else {
			echo $this->migration->error_string();
		}
	}
}
