<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Header extends MX_Controller {

  // - top
  public function top($header_data = [], $header_view)
  {
    $data = [
      'robots' => $header_data['robots'],
      'refresh' => $header_data['refresh'],
      'title' => $header_data['title'],
      'description' => $header_data['description'],
      'keywords' => $header_data['keywords'],
      'author' => $header_data['author'],
      'copyright' => $header_data['copyright'],
      'theme_color' => $header_data['theme_color'],
      'domain_name' => $header_data['domain_name'],
      'twitter_account' => $header_data['twitter_account'],
      'page' => $header_data['page'],
      'title' => $header_data['title'],
      'title_module' => $header_data['title_module'],
      'navigation_menu' => $header_data['navigation_menu'],
    ];

    $set_header_view = $header_view === 'auth' ? 'header-auth' : 'header-dashboard';
    $this->load->view($set_header_view, $data);
  }
}
