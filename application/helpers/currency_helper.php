<?php

if (!function_exists('idr_format')) {
  function idr_format($value){
    $r = 'Rp ' .  number_format($value, 0, ',', '.');
    return $r;
  }
}

if (!function_exists('remove_idr_format')) {
  function remove_idr_format($value) {
    $r = preg_replace('/[Rp.]/', '', $value);
    return $r;
  }
}

if (!function_exists('rounding')) {
  function rounding($value) {
    $split = explode('.', (string)$value);
    $number = intval($split[0]);

    if (isset($split[1])) {
      $float_comma = (int)mb_substr($split[1], 0, 1);

      if ($float_comma >= 5) {
        $number = intval($split[0]) + 1;
      }
    }

    return $number;
  }
}
