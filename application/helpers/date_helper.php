<?php
if (!function_exists('format_date')) 
{
	function format_date($value_date, $is_day = true, $is_time = false)
	{
		// Array of days
		$day_array = [
			'Minggu',
			'Senin',
			'Selasa',
			'Rabu',
			'Kamis',
			'Jumat',
			'Sabtu'
		];
		
		// Get the day, date, and time details
		$day_of_week = date('w', strtotime($value_date));
		$day = $day_array[$day_of_week];
		$date = date('j', strtotime($value_date));
		
		// Array of months
		$month_array = [
			1 => 'Januari',
			2 => 'Februari',
			3 => 'Maret',
			4 => 'April',
			5 => 'Mei',
			6 => 'Juni',
			7 => 'Juli',
			8 => 'Agustus',
			9 => 'September',
			10 => 'Oktober',
			11 => 'November',
			12 => 'Desember',
		];
		
		// Get the month and year
		$month_number = date('n', strtotime($value_date));
		$month = $month_array[$month_number];
		$year = date('Y', strtotime($value_date));
		
		// Get the time if needed
		$time = date('H:i:s', strtotime($value_date));
		
		// Build the formatted date string
		$formatted_date = ($is_day) ? "$day, $date $month $year" : "$date $month $year";
		
		// Add time if requested
		if ($is_time) {
			$formatted_date .= " $time";
		}
		
		return $formatted_date;
	}
}

if (!function_exists('dynamic_year')) {
	function dynamic_year() {
		// Get the current year and create a range of the last 5 years including the current year
		$current_year = date('Y');
		$years = range($current_year - 5, $current_year);
		
		return $years;
	}
}
