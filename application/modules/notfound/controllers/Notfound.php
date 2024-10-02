<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Notfound extends MX_Controller {

  // -- __construct
  public function __construct()
  {
    parent::__construct();
    if ($this->uri->segment(1) !== 'page-not-found') {
      redirect('page-not-found');
    }
  }

  // -- index
  public function index()
  {
    // - template
    template_page('Halaman Tidak Ditemukan', 'page-not-found', 'notfound/view', '', 'auth');
  }

  // -- view
  public function view()
  {
    $this->load->view('index');
  }
}
