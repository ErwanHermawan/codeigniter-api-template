<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Notfound extends RestController {
	
	public function __construct()
	{
		parent::__construct();
	}
	
	// get category
	public function index()
	{
		api_print('API Not Found', false, 404);
	}
	
}
