<?php
		defined('BASEPATH') OR exit('No direct script access allowed');
		class Product extends MX_Controller {
			public function __construct() {
				parent::__construct();
			}

			// -- index
			public function index() {
				// - template
				template_page('Product', 'product', 'product/view');
			}

			// -- view
			public function view()
			{
				$this->load->view('index');
			}
		}
