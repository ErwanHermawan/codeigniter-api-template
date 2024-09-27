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
		$CI =& get_instance(); // Get the CodeIgniter instance
		$CI->load->config('jwt'); // Load the JWT config
		$secret_key = $CI->config->item('jwt_key'); // Load secret key from config
		$expiration = $CI->config->item('token_timeout'); // Load expiration time from config

		// Convert minute to seconds
    $expiration_seconds = $expiration * 60;

		$token_data = [
			"iat" => time(), // Issued at
			"exp" => time() + $expiration_seconds, // Expiration time
			"data" => $data
		];
		
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
		$CI =& get_instance(); // Get the CodeIgniter instance
		$CI->load->config('jwt');
		$secret_key = $CI->config->item('jwt_key'); // Load secret key from config
		$token = str_replace('Bearer ', '', $token);
		
		try {
			return JWT::decode($token, new Key($secret_key, 'HS256'));
		} catch (Exception $e) {
			return false; // Return false on failure or handle the exception as needed
		}
	}
}
