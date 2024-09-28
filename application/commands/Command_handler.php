<?php

class Command_handler
{
	public function __construct()
	{
		global $argv;
		
		// Ensure that a command has been provided
		if (!isset($argv[1])) {
			echo "Please specify a command.\n";
			exit;
		}
		
		$command = $argv[1];  // First argument is the command name
		$params = array_slice($argv, 2);  // Remaining arguments are parameters

		// Dispatch the command to the appropriate handler
		if ($command === 'create-module')
		{
			$this->dispatch_create_module($command, $params);
		} else if ($command === 'migration') {
			$this->dispatch_migration($command, $params);
		} else {
			echo "Command '$command' not found.\n";
			exit;
		}
	}
	
	// dispatch_create_module
	protected function dispatch_create_module($command, $params)
	{
		$command_class = ucfirst(str_replace('-', '_', $command)) . '_command';
		$command_file = APPPATH . "commands/$command_class.php";
		
		if (file_exists($command_file)) {
			require_once $command_file;
			
			if (class_exists($command_class)) {
				$command_instance = new $command_class();
				$command_instance->run($params);
			} else {
				echo "Command class '$command_class' not found.\n";
			}
		} else {
			echo "Command '$command' not found.\n";
		}
	}

	// dispatch_migration
	protected function dispatch_migration($command, $params)
	{
		$command_class = ucfirst(str_replace('-', '_', $command)) . '_command';
		$command_file = APPPATH . "commands/$command_class.php";

		if (file_exists($command_file)) {
			require_once $command_file;
			
			if (class_exists($command_class)) {
				$command_instance = new $command_class();
				$command_instance->run_migrations($params);
			} else {
				echo "Command class '$command_class' not found.\n";
			}
		} else {
			echo "Command '$command' not found.\n";
		}
	}
}

new Command_handler();
