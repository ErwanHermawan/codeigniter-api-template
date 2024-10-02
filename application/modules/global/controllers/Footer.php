<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Footer extends MX_Controller {

  // - bottom
  public function bottom($footer_data = [], $footer_view)
  {
    $data = [
      'page' => $footer_data['page'],
      'copyright' => $footer_data['copyright']
    ];
    $set_footer_view = $footer_view === 'auth' ? 'footer-auth' : 'footer-dashboard';
    $this->load->view($set_footer_view, $data);
  }
}
