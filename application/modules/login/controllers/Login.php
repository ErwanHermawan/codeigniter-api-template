<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends MX_Controller {

  // -- __construct
  public function __construct()
  {
    parent::__construct();
    $this->load->model('login_model', '', TRUE);
  }

  // -- index
  public function index()
  {
    // - template
    template_page('Login', 'login', 'login/view', '', 'auth');
  }

  // -- view
  public function view()
  {
    $this->load->view('index');
  }

  // -- acess_block
  public function acess_block()
  {
    // - template
    template_page('Login', 'login', 'login/view_acess_block', '', 'auth');
  }

  // -- view_acess_block
  public function view_acess_block()
  {
    $this->load->view('block');
  }

  // -- process
  public function process()
  {
    if($this->login_model->validate())
    {
      redirect('home');
    }
    else
    {
      redirect('login');
    }
  }

  public function logout()
  {
    $this->login_model->logout();
    redirect('login');
  }
}
