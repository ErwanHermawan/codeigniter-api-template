<?php

if (!function_exists('get_code')) 
{
  /**
   * Generate a new code based on the last code from the database.
   *
   * @param string $table The name of the database table.
   * @param string $column The column to fetch the code from.
   * @param string $prefix The prefix for the new code.
   * @param int $length The length of the numeric portion of the code.
   * @return string The newly generated code.
   */
  function get_code(string $table, string $column, string $prefix, int $length = 3): string 
  {
    $ci = get_instance();
    $ci->load->model('global_model');
    
    // Fetch the code from the database
    $row = $ci->global_model->get_code($table, $column, $prefix);
    
    // Extract the numeric portion of the code, assuming the code starts after the prefix
    $last_code = isset($row->code) ? $row->code : $prefix . str_repeat('0', $length);
    $last_order = (int) substr($last_code, strlen($prefix), $length);
    
    // Increment the numeric part
    $new_order = $last_order + 1;
    
    // Format the new code by appending the incremented number, padded with leading zeros
    $new_code = $prefix . sprintf('%0'.$length.'s', $new_order);
    
    return $new_code;
  }
}

if (!function_exists('get_code_date')) 
{
  /**
   * Generate a new code based on the current date and the last code from the database.
   *
   * @param string $table The name of the database table.
   * @param string $column The column to fetch the code from.
   * @param string|int $prefix An optional prefix for the code.
   * @return string The newly generated date-based code.
   */
  function get_code_date(string $table, string $column, $prefix = 0): string
  {
    // Generate date-based prefix
    $date_prefix = date('ymd');
    $code_date = ($prefix !== 0) ? $prefix . date('dmy') : $date_prefix;
    
    // Load model and get the code from the database
    $ci = get_instance();
    $ci->load->model('global_model');
    $row = $ci->global_model->get_code($table, $column, $code_date);
    
    // Default code if no previous code exists
    $last_code = isset($row->code) ? $row->code : $code_date . '0000';
    
    // Extract the numeric part and increment it
    $last_number = (int) substr($last_code, -4);
    $new_number = $last_number + 1;
    
    // Generate the new code by appending the incremented number
    $new_code = $code_date . sprintf('%04s', $new_number);
    
    return $new_code;
  }
}
