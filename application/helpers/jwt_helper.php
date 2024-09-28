<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if (!function_exists('generate_jwt')) {
	/**
	* Generate JWT token
	*
	* @param array $data The data to encode in the token
	* @return string The encoded JWT token
	*/
	function generate_jwt($data) {
		$CI = &get_instance(); // Get the CodeIgniter instance
		$CI->load->config('jwt'); // Load the JWT config
		
		// Retrieve secret key and token expiration from config
		$secret_key = $CI->config->item('jwt_key');
		$expiration_minutes = $CI->config->item('token_timeout');
		
		// Convert expiration from minutes to seconds
		$expiration_seconds = $expiration_minutes * 60;
		
		// Define the payload
		$token_data = [
			"iat" => time(), // Issued at
			"exp" => time() + $expiration_seconds, // Expiration time
			"data" => $data // Custom data payload
		];
		
		// Encode the JWT using the secret key and HS256 algorithm
		return JWT::encode($token_data, $secret_key, 'HS256');
	}
}

if (!function_exists('decode_jwt')) {
	/**
	* Decode JWT token
	*
	* @param string $token The JWT token
	* @return mixed The decoded data or false on failure
	*/
	function decode_jwt($token) {
		$CI = &get_instance(); // Get the CodeIgniter instance
		$CI->load->config('jwt'); // Load the JWT config
		
		// Retrieve secret key from config
		$secret_key = $CI->config->item('jwt_key');
		
		// Remove 'Bearer ' from the token if present
		$token = str_replace('Bearer ', '', $token);
		
		try {
			// Decode the JWT and return the data
			return JWT::decode($token, new Key($secret_key, 'HS256'));
		} catch (Exception $e) {
			// Log the error message for debugging (optional)
			log_message('error', 'JWT Decode Error: ' . $e->getMessage());
			
			return false; // Return false on failure
		}
	}
}
