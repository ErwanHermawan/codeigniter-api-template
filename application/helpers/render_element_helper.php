<?php
if (!function_exists('render_image')) {
	function render_image($path_url) {
		$element_image = '<span class="user-avatar">
												<img class="user-avatar__img" src="' . htmlspecialchars($path_url, ENT_QUOTES, 'UTF-8') . '" />
											</span>';
		return $element_image;
	}
}

if (!function_exists('render_active_status')) {
	function render_active_status($status) {
		$element_status = ($status !== '0') 
						? '<span data-toggle="tooltip" data-placement="left" title="Aktif" class="badge badge-success"><i class="mdi mdi-power"></i></span>'
						: '<span data-toggle="tooltip" data-placement="left" title="Tidak Aktif" class="badge badge-danger"><i class="mdi mdi-power"></i></span>';

		return $element_status;
	}
}

if (!function_exists('render_action_button')) {
  function render_action_button($id, $actions = []) {
    $buttons = '';

    // Check which actions are allowed and append respective buttons
    if (in_array('edit', $actions)) {
      $buttons .= '<button type="button" data-toggle="tooltip" data-placement="left" title="Edit" class="btn btn-icon waves-effect btn-primary btn-trans mr-1 js-edit-data" data-id="' . $id . '">
				<i class="mdi mdi-pencil-outline"></i>
			</button>';
    }

    if (in_array('delete', $actions)) {
      $buttons .= '<button type="button" data-toggle="tooltip" data-placement="left" title="Delete" class="btn btn-icon waves-effect btn-danger btn-trans mr-1 js-delete-data" data-id="' . $id . '">
				<i class="mdi mdi-trash-can-outline"></i>
			</button>';
    }

    return $buttons;
  }
}

if (!function_exists('render_checkbox')) {
  function render_checkbox($id) {
		$check_element = '<div class="custom-checkbox">
												<label class="custom-checkbox__wrapper">
													<input type="checkbox" value="'. $id .'" />
													<div class="custom-checkbox__checkmark"></div>
												</label>
											</div>';

		return $check_element;
	}
}

if (!function_exists('is_datatables_request')) {
  function is_datatables_request() {

		return $check_element;
	}
}
