<?php

class Create_module_command
{
  public function run($params)
  {
    if (empty($params)) {
      echo "Please specify the controller name.\n";
      return;
			exit;
    }
    
    $module_name = strtolower($params[0]);
		// controller path
    $controller_path = APPPATH . "modules/{$module_name}/controllers/" . ucfirst($module_name) . ".php";
    
    if (file_exists($controller_path)) {
      echo "Module '$module_name' already exists.\n";
      return;
			exit;
    }

    // Create the module directory if it doesn't exist
    if (!is_dir(APPPATH . "modules/{$module_name}")) {
      mkdir(APPPATH . "modules/{$module_name}/controllers/", 0755, true);
      mkdir(APPPATH . "modules/{$module_name}/views/", 0755, true);
      echo "Module '$module_name' created successfully.\n";
    }

    
    // controller template
		$controller_template = "<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class " . ucfirst($module_name) . " extends MX_Controller {
	public function __construct() {
		parent::__construct();
	}

	// -- index
	public function index() {
		// - template
		template_page('" . ucfirst($module_name) . "', '{$module_name}', '{$module_name}/view');
	}

	// -- view
	public function view()
	{
		\$this->load->view('index');
	}
}\n";
    
    // Create the controller file
    if (file_put_contents($controller_path, $controller_template)) {
      echo "Controller '$module_name' created successfully.\n";
    } else {
      echo "Failed to create the controller.\n";
    }

		// view path
    $view_path = APPPATH . "modules/{$module_name}/views/index.php";

		// view template
		$view_template = "<h1>Welcome to $module_name Module Page</h1>";

		// Create the view file
    if (file_put_contents($view_path, $view_template)) {
      echo "View '$module_name' created successfully.\n";
    } else {
      echo "Failed to create the view.\n";
    }
  }
}
