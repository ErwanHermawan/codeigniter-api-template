<?php
// Ensure the script is running in CLI mode
if (PHP_SAPI !== 'cli') {
    exit('This script can only be run from the command line.');
}

// Define the application and system path
$system_path = 'system';
$application_folder = 'application';

// Define environment
define('ENVIRONMENT', 'development');

// Set up $_SERVER variables for CLI compatibility
$_SERVER['SERVER_PORT'] = 80;
$_SERVER['HTTP_HOST'] = 'localhost';
$_SERVER['SCRIPT_NAME'] = 'index.php';
$_SERVER['SCRIPT_FILENAME'] = 'index.php';
$_SERVER['REQUEST_URI'] = '/';
$_SERVER['argv'] = [];

// Define path constants
define('BASEPATH', realpath($system_path) . '/');
define('APPPATH', realpath($application_folder) . '/');

// Load CodeIgniter core
// require_once BASEPATH . 'core/CodeIgniter.php';

// Load command handler from HMVC modules
require_once APPPATH . 'commands/Command_handler.php';
