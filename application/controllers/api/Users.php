<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Users extends RestController {
	
	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		// serring cross origin
		cross_origin();
	}
	
	public function index_get()
	{
		// Users from a data store e.g. database
		$users = [
			['id' => 0, 'name' => 'John', 'email' => 'john@example.com'],
			['id' => 1, 'name' => 'Jim', 'email' => 'jim@example.com'],
		];
		
		$id = $this->get( 'id' );
		
		if ( $id === null )
		{
			// Check if the users data store contains users
			if ( $users )
			{
				// param print api: message, status, code, data
				api_print('Get data successfully', true, 200, $users);
			}
			else
			{
				// param print api: message, status, code, data
				api_print('No users were found', false, 404);
			}
		}
		else
		{
			if ( array_key_exists( $id, $users ) )
			{
				$this->response( $users[$id], 200 );
			}
			else
			{
				// param print api: message, status, code, data
				api_print('No such user found', false, 404);
			}
		}
	}
}
