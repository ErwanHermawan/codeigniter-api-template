<?php
function f_date($value_date, $is_day = true, $is_time = false)
{
  $day_array = array(
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu'
  );
  $hr = date('w', strtotime($value_date));
  $day = $day_array[$hr];
  $date = date('j', strtotime($value_date));
  $month = array(
    1 => 'Januari',
    2 => 'Februari',
    3 => 'maret',
    4 => 'April',
    5 => 'Mei',
    6 => 'Juni',
    7 => 'Juli',
    8 => 'Augustus',
    9 => 'September',
    10 => 'OKtober',
    11 => 'November',
    12 => 'Desember',
  );
  $bl = date('n', strtotime($value_date));
  $month = $month[$bl];
  $year = date('Y', strtotime($value_date));
  $jam = date( 'H:i:s', strtotime($value_date));

  $return = "$day, $date $month $year";
  if ($is_day === false) {
    $return = "$date $month $year";
  }
  return $return;
}

if (!function_exists('dynamic_year')) {
  function dynamic_year() {
    $current_year = date('Y');
    $before_year = range($current_year-5, $current_year);
    // $after_year = range($current_year, $current_year+3);

    $years = array_unique(array_merge((array) $before_year));

    return $years;
  }
}

if (!function_exists('title_case')) {
  function title_case($name) {
    $lower_name = strtolower($name);
    $title_name = ucwords($lower_name);

    return $title_name;
  }
}
