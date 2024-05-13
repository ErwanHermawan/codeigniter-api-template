<?php

if (!function_exists('upload_img')) {
  function upload_img($value_name, $dir_file, $id_file=0, $dir_base='default', $max_size='2000', $max_width='5120') {
    $set_id_file = $id_file == 0 ? rand(00000000000, 99999999999) : $id_file;
    $file_name = $_FILES[$value_name]['name'];
    $file_tmp = explode(".", $file_name);
    $file_ext = end($file_tmp);
    $file_name = $set_id_file . '.' . $file_ext;
    if ($dir_base == 'default') {
      $files = 'files/' . $dir_file . '/';
    } else {
      $files = FILES_MEMBER . $dir_file . '/';
    }
    $config = [
      'file_name' => $set_id_file,
      'upload_path' => $files,
      'allowed_types' => 'bmp|gif|jpg|jpeg|png',
      'max_size' => $max_size,
      'max_width' => $max_width
    ];

    $result = (object) [
      'file_ext' => $file_ext,
      'file_name' => $file_name,
      'config' => $config
    ];
    return $result;
  }
}

if (!function_exists('update_img')) {
  function update_img($dir_file, $tmp_file, $new_file, $width=512, $dir_base='default') {
    if ($dir_base == 'default') {
      $tmp_files = 'files/' . $dir_file . '/' . $tmp_file;
      $new_files = 'files/' . $dir_file . '/' . $new_file;
    } else {
      $tmp_files = FILES_MEMBER . $dir_file . '/' . $tmp_file;
      $new_files = FILES_MEMBER . $dir_file . '/' . $new_file;
    }
    $config = [
      'image_library' => 'gd2',
      'source_image' => $tmp_files,
      'new_image' => $new_files,
      'maintain_ratio' => TRUE,
      'width' => $width
    ];

    return $config;
  }
}

if (!function_exists('delete_img')) {
  function delete_img($dir_file, $file_name, $dir_base='default') {
    if ($dir_base == 'default') {
      $file_exist = 'files/' . $dir_file . '/' . $file_name;
    } else {
      $file_exist = FILES_MEMBER . $dir_file . '/' . $file_name;
    }
		if (file_exists($file_exist)) {
			unlink($file_exist);
		}
  }
}

if (!function_exists('upload_file')) {
  function upload_file($value_name, $dir_file, $id_file=0, $max_size='4096', $dir_base='default') {
    $file_name = $_FILES[$value_name]['name'];
    $file_tmp = explode(".", $file_name);
    $file_ext = end($file_tmp);
    $file_name = strtolower(str_replace(' ', '-', $file_name));
    if ($dir_base == 'default') {
      $files_config = 'files/' . $dir_file . '/';
      $files_result = 'files/' . $dir_file . '/' . $file_name;
    } else {
      $files_config = FILES_MEMBER . $dir_file . '/';
      $files_result = FILES_MEMBER . $dir_file . '/' . $file_name;

    }
    $config = [
      'file_name' => $file_name,
      'upload_path' => $files_config,
      'allowed_types' => 'csv|CSV|xlsx|XLSX|xls|XLS',
      'max_size' => $max_size,
    ];

    $result = (object) [
      'file_ext' => $file_ext,
      'file_name' => $file_name,
      'file_path' => $files_result,
      'config' => $config
    ];
    return $result;
  }
}
