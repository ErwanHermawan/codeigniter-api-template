<?php

if (!function_exists('upload_img')) {
	/**
	* Prepare the configuration for uploading an image.
	*
	* @param string $value_name The name of the input field for the file upload
	* @param string $dir_file The directory where the file will be uploaded
	* @param int $id_file Optional; the ID for the file (default is 0, which generates a random ID)
	* @param string $dir_base Base directory option (default is 'default')
	* @param int $max_size Maximum file size in kilobytes (default is 2000)
	* @param int $max_width Maximum width of the image in pixels (default is 5120)
	* @return object An object containing the file extension, file name, and upload configuration
	*/
	function upload_img($value_name, $dir_file, $id_file = 0, $dir_base = 'default', $max_size = 2000, $max_width = 5120) {
		// Set the file ID, either from the parameter or randomly
		$set_id_file = $id_file === 0 ? rand(0, 99999999999) : $id_file;
		
		// Get the uploaded file name and extension
		$file_name = $_FILES[$value_name]['name'];
		$file_ext = pathinfo($file_name, PATHINFO_EXTENSION); // More robust method to get file extension
		
		// Create the new file name
		$file_name = $set_id_file . '.' . $file_ext;
		
		// Set the upload directory based on the base directory
		$files = ($dir_base === 'default') ? 'files/' . $dir_file . '/' : FILES_MEMBER . $dir_file . '/';
		
		// Prepare the configuration for the file upload
		$config = [
			'file_name' => $set_id_file,
			'upload_path' => $files,
			'allowed_types' => 'bmp|gif|jpg|jpeg|png',
			'max_size' => $max_size,
			'max_width' => $max_width
		];
		
		// Create the result object to return
		$result = (object) [
			'file_ext' => $file_ext,
			'file_name' => $file_name,
			'config' => $config
		];
		
		return $result;
	}
}

if (!function_exists('update_img')) {
	/**
	* Prepare configuration for updating an image.
	*
	* @param string $dir_file The directory where the image is stored
	* @param string $tmp_file The name of the temporary file
	* @param string $new_file The name of the new file
	* @param int $width The desired width for the new image (default is 512)
	* @param string $dir_base Base directory option (default is 'default')
	* @return array Configuration array for image update
	*/
	function update_img($dir_file, $tmp_file, $new_file, $width = 1024, $dir_base = 'default') {
		// Determine the directory based on base directory option
		$base_path = ($dir_base === 'default') ? 'files/' : FILES_MEMBER;
		
		// Prepare the full paths for the temporary and new image files
		$tmp_files = $base_path . $dir_file . '/' . $tmp_file;
		$new_files = $base_path . $dir_file . '/' . $new_file;
		
		// Prepare the configuration for updating the image
		$config = [
			'image_library' => 'gd2',
			'source_image' => $tmp_files,
			'new_image' => $new_files,
			'maintain_ratio' => true,
			'width' => $width
		];
		
		return $config;
	}
}

if (!function_exists('delete_img')) {
	/**
	* Delete an image file from the specified directory.
	*
	* @param string $dir_file The directory where the image is located
	* @param string $file_name The name of the file to delete
	* @param string $dir_base Base directory option (default is 'default')
	* @return void
	*/
	function delete_img($dir_file, $file_name, $dir_base = 'default') {
		// Determine the full path of the file based on the base directory option
		$base_path = ($dir_base === 'default') ? 'files/' : FILES_MEMBER;
		$file_path = $base_path . $dir_file . '/' . $file_name;
		
		// Check if the file exists and delete it
		if (file_exists($file_path)) {
			unlink($file_path);
		}
	}
}

if (!function_exists('upload_file')) {
	/**
	* Prepare the configuration for uploading a file.
	*
	* @param string $value_name The name of the file input in the form
	* @param string $dir_file The directory where the file will be uploaded
	* @param int $id_file Optional ID for the file (default is 0)
	* @param int $max_size The maximum file size in kilobytes (default is 4096)
	* @param string $dir_base Base directory option (default is 'default')
	* @return object Configuration object for the uploaded file
	*/
	function upload_file($value_name, $dir_file, $id_file = 0, $max_size = 4096, $dir_base = 'default') {
		// Get the original file name and extract the extension
		$file_name = $_FILES[$value_name]['name'];
		$file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
		$file_name = strtolower(str_replace(' ', '-', $file_name));
		
		// Determine the upload path based on the base directory option
		$base_path = ($dir_base === 'default') ? 'files/' : FILES_MEMBER;
		$files_config = $base_path . $dir_file . '/';
		$files_result = $base_path . $dir_file . '/' . $file_name;
		
		// Prepare the configuration for file upload
		$config = [
			'file_name' => $file_name,
			'upload_path' => $files_config,
			'allowed_types' => 'csv|xlsx|xls',
			'max_size' => $max_size,
		];
		
		// Create an object to return the upload details
		$result = (object) [
			'file_ext' => $file_ext,
			'file_name' => $file_name,
			'file_path' => $files_result,
			'config' => $config
		];
		
		return $result;
	}
}

