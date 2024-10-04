<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_model extends CI_Model {

  // -- __construct
  public function __construct()
  {
    parent::__construct();
  }

  // -- validate
  public function validate()
  {
    $username = $this->security->xss_clean($_POST['username']);
    $password = $this->security->xss_clean($_POST['password']);

    // - query
    $this->db->where('username', $username);
    $this->db->where('status', '1');
    $q = $this->db->get('tb_users');

    // - username found
    if ($q->num_rows() > 0)
    {
      $user_detail = $q->row();
      // - password is correct
      if (password_verify($password, $user_detail->password))
      {
        $user_log = array(
          'user_id' => $user_detail->user_id,
          'date_log' => date('Y-m-d H:i:s'),
          'status' => '1',
          'user_ip' => $_SERVER['REMOTE_ADDR']
        );
        $this->db->insert('tb_users_log', $user_log);

        $data = [
          'logged_in' => true,
          'user_id' => $user_detail->user_id,
          'full_name' => $user_detail->first_name . ' ' . $user_detail->mid_name . ' ' . $user_detail->last_name,
          'photo' => $user_detail->photo,
          'status' => $user_detail->status,
          'role' => $user_detail->role
        ];

        $this->session->set_userdata($data);
        return true;
      }
      else
      {
        $this->session->set_flashdata('message', 'Your password is incorrect');
        return false;
      }
    }
    else
    {
      $this->session->set_flashdata('message', 'Your username is not found');
      return false;
    }
  }

  // -- logout
  public function logout()
  {
    $user_log = array(
      'user_id' => $this->session->userdata('user_id'),
      'date_log' => date('Y-m-d H:i:s'),
      'status' => '0',
      'user_ip' => $_SERVER['REMOTE_ADDR']
    );
    $this->db->insert('tb_users_log', $user_log);

    $data = [
      'logged_in' => false,
      'user_id' => '',
      'full_name' => '',
      'photo' => '',
      'status' => '',
      'role' => ''
    ];
    $this->session->sess_destroy($data);
    $this->session->unset_userdata($data);
  }
}
