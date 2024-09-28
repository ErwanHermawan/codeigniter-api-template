<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Migration_Create_users extends CI_Migration {
	
	public function up()
	{
		// Define the schema for the 'users' table
		$this->dbforge->add_field(array(
			'id' => array(
				'type' => 'INT',
				'constraint' => 5,
				'unsigned' => TRUE,
				'auto_increment' => TRUE
			),
			'username' => array(
				'type' => 'VARCHAR',
				'constraint' => '100',
			),
			'email' => array(
				'type' => 'VARCHAR',
				'constraint' => '100',
			),
			'password' => array(
				'type' => 'VARCHAR',
				'constraint' => '255',
			),
			'created_at' => array(
				'type' => 'TIMESTAMP',
				'null' => TRUE,
				'default' => 'CURRENT_TIMESTAMP'
			),
		));
		$this->dbforge->add_key('id', TRUE);
		$this->dbforge->create_table('users');
	}
	
	public function down()
	{
		// Drop the table when rolling back migration
		$this->dbforge->drop_table('users');
	}
}
