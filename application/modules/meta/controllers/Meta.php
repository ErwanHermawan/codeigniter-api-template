<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Meta extends MX_Controller
{

  // -- __construct
  public function __construct()
  {
    parent::__construct();
  }

  // -- index
  public function index()
  {
    // - template
    template_page('Meta', 'meta', 'meta/view');
  }

  // -- view
  public function view()
  {
    $data = [
      'meta' => $this->global_model->get_single_data('tb_meta', 'meta_id', 1)
    ];

    $this->load->view('index', $data);
  }

  // -- edit
  public function edit($meta_id)
  {
    // - template
    template_page('Edit Meta', 'meta', 'meta/view_edit', $meta_id);
  }

  // -- view edit
  public function view_edit($meta_id)
  {

    $data = [
      'meta' => $this->global_model->get_single_data('tb_meta', 'meta_id', $meta_id)
    ];

    $this->load->view('edit', $data);
  }
}
