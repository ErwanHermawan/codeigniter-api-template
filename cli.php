<?php

// Ensure the script is running in CLI mode
if (PHP_SAPI !== 'cli') {
    exit('This script can only be run from the command line.');
}

// Setup basic $_SERVER variables for CLI compatibility if needed
$_SERVER['SERVER_PORT'] = 80;
$_SERVER['HTTP_HOST'] = 'localhost';
$_SERVER['SCRIPT_NAME'] = 'index.php';
$_SERVER['SCRIPT_FILENAME'] = 'index.php';
$_SERVER['REQUEST_URI'] = '/';

// Load the CodeIgniter application (this includes your index.php)
// No need to redefine FCPATH, ENVIRONMENT, or BASEPATH
require_once __DIR__ . '/index.php';

// Optionally load the command handler from HMVC modules (if necessary)
if (file_exists(APPPATH . 'commands/Command_handler.php')) {
    require_once APPPATH . 'commands/Command_handler.php';
} else {
    echo "Command handler not found in commands folder.\n";
}
