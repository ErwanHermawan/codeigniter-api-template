<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CreateModule extends CI_Controller {
	
	public function index($module_name = 'home') {
		$this->create_module_structure($module_name);
		echo "Module, controller, and view created successfully for module: $module_name\n";
	}
	
	private function create_module_structure($module_name) {
		// Create module directory
		$module_dir = APPPATH . 'modules/' . strtolower($module_name);
		if (!is_dir($module_dir)) {
			mkdir($module_dir, 0755, true);
			mkdir($module_dir . '/controllers', 0755, true);
			mkdir($module_dir . '/views', 0755, true);
		}
		
		// Create controller
		$controller_content = "<?php\n
		defined('BASEPATH') OR exit('No direct script access allowed');\n
		class $module_name extends MX_Controller {\n
			public function __construct() {\n
					parent::__construct();\n
			}\n\n
			public function index() {\n
					\$this->load->view('{$module_name}_view');\n
			}\n
		}\n";
		$controller_path = $module_dir . '/controllers/' . ucfirst($module_name) . '.php';
		file_put_contents($controller_path, $controller_content);
		
		// Create view
		$view_content = "<!DOCTYPE html>\n<html>\n<head>\n<title>$module_name Page</title>\n</head>\n<body>\n<h1>Welcome to $module_name Module Page</h1>\n</body>\n</html>";
		$view_path = $module_dir . '/views/' . strtolower($module_name) . '_view.php';
		file_put_contents($view_path, $view_content);
	}
}
