<?php

if (!function_exists('get_code')) 
{
  function get_code($table, $column, $code, $length = 3, $user_id) 
	{
    $ci = get_instance();
		$ci->load->model('global_model');
		$get_row = $ci->global_model->get_code($table, $column, $code)->row();
		$kode = $get_row->code;
		$urutan = (int) substr($kode, 2, $length);
		$urutan++;
		$format_code = $code . sprintf('%0'.$length.'s', $urutan);
		return $format_code;
  }
}

if (!function_exists('get_code_date')) 
{
  function get_code_date($table, $column, $code = 0, $user_id = 0)
  {
    $code_date = date('ymd');
    if ($code !== 0 ) 
		{
      $code_date = $code . date('dmy');
    }

    // get data
    $ci = get_instance();
		$ci->load->model('global_model');
		$get_row = $ci->global_model->get_code($table, $column, $code_date, $user_id)->row();
		$code_format = $get_row->code;


		$i = (int) substr($code_format, 9, 4);	
		$i++;

		$r = $code_date . sprintf('%04s', $i);
		return $r;
  }
}
