<?php

if (!function_exists('idr_format')) {
	/**
	* Format a number as Indonesian Rupiah
	*
	* @param float|int $value
	* @return string
	*/
	function idr_format($value) {
		return 'Rp ' . number_format($value, 0, ',', '.');
	}
}

if (!function_exists('remove_idr_format')) {
	/**
	* Remove Indonesian Rupiah format from a string
	*
	* @param string $value
	* @return string
	*/
	function remove_idr_format($value) {
		return preg_replace('/[Rp.]/', '', $value);
	}
}

if (!function_exists('rounding')) {
	/**
	* Round a number to the nearest integer based on the first decimal digit
	*
	* @param float|int $value
	* @return int
	*/
	function rounding($value) {
		$value = (string) $value; // Ensure the value is treated as a string
		$split = explode('.', $value); // Split the integer and decimal parts
		$number = (int) $split[0]; // Get the integer part
		
		// Check if there is a decimal part and round based on the first decimal digit
		if (isset($split[1]) && (int) mb_substr($split[1], 0, 1) >= 5) {
			$number += 1; // Round up if the first decimal is 5 or more
		}
		
		return $number;
	}
}
