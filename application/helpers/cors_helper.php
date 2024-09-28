<?php

if (!function_exists('cross_origin')) {
	function cross_origin() {
		// Set headers for CORS
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
		header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
		
		// Handle preflight OPTIONS request
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
			exit(0);
		}
	}
}
