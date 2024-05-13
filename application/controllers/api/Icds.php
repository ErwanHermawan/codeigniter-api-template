<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

class Icds extends RestController {
	
	public function __construct($config = 'rest')
	{
		parent::__construct($config);
		// serring cross origin
		cross_origin();
	}
	
	// get icds
	public function index_get()
	{
		$icd_code = $this->get('idcCode');
		
		if ($icd_code !== null)
		{
			$result = $this->global_model->get_single_data('tb_icds', 'icdCode', $icd_code);
		}
		{
			$search = $this->get('search') !== null ? $this->get('search') : 0;
			$search_data = [
				'icdCode' => $search,
				'nameEn' => $search
			];

			$result = $this->global_model->get_data('tb_icds', $search_data, $limit = 25);
		}
		
		if (count($result) >= 0)
		{
			// param print api: message, status, code, data
			api_print('Get data successfully', true, 200, $result);
		} 
		else 
		{
			// param print api: message, status, code, data
			api_print('Data not found', false, 404);
		}
	}
}
