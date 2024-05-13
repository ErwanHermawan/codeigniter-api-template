<?php
if (!function_exists('access_block')) {
  function access_block() {
    $ci =& get_instance();
    $status = false;
    if ($ci->session->userdata('status') !== '1') {
      $status = true;
    }
    return $status;
  }
}
