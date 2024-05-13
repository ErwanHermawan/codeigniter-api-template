<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Global_model extends CI_Model {

  public function __construct() {
		parent::__construct();
  }

  public function get_data($table, $multi_keyword = 0, $limit = 0, $sort = 0) {
    $this->db->from($table);

		if ($multi_keyword != 0) 
		{
      if (count($multi_keyword) > 1) 
			{
        $this->db->group_start();
        foreach (array_slice($multi_keyword, 0, 1) as $field => $val) 
				{
          $this->db->like($field, $val);
        }
        foreach (array_slice($multi_keyword, 1) as $field => $val) 
				{
          $this->db->or_like($field, $val);
        }
        $this->db->group_end();
      } 
			else 
			{
        foreach ($multi_keyword as $field => $val) 
				{
          $this->db->like($field, $val);
        }
      }
    }

		if ($limit != 0) 
		{
      $this->db->limit($limit);
    }

    if ($sort !== 0) {
			if ($this->db->field_exists('createdDate', $table)) {
				// sort
				$this->db->order_by('createdDate', $sort);
			}
    }

    $q = $this->db->get();
    return $q->result_array();
  }

  public function get_data_where($table, $multi_where = 0, $or_where = 0, $sorting = 0, $limit = 0, $multi_keyword = 0)
  {
    if ($multi_where !== 0) {
      foreach ($multi_where as $field => $val) {
        $this->db->where($field, $val);
      }
    }
    if ($or_where !== 0) {
      foreach ($or_where as $field => $val) {
        $this->db->or_where($field, $val);
      }
    }

    // short
    if ($sorting !== 0) {
      $this->db->order_by($sorting->field, $sorting->order);
    }

		if ($limit !== 0)
		{
			$this->db->limit(10);
		}

		if ($multi_keyword != 0) 
		{
      if (count($multi_keyword) > 1) 
			{
        $this->db->group_start();
        foreach (array_slice($multi_keyword, 0, 1) as $field => $val) 
				{
          $this->db->like($field, $val);
        }
        foreach (array_slice($multi_keyword, 1) as $field => $val) 
				{
          $this->db->or_like($field, $val);
        }
        $this->db->group_end();
      } 
			else 
			{
        foreach ($multi_keyword as $field => $val) 
				{
          $this->db->like($field, $val);
        }
      }
    }

    $q = $this->db->get($table);
    return $q->result_array();
  }

  public function get_single_data($table, $column = 0 , $value = 0, $sort = 0) {
		if ($column !== 0 && $value !== 0) {
			$this->db->where($column, $value);
		}

		if ($sort !== 0) {
			$this->db->order_by($sort->field, $sort->order);
		}
		
    $q = $this->db->get($table);
    if($q->num_rows() > 0) {
      return $q->row();
    } else {
      return null;
    }
  }

  public function add($table, $data, $id = false) {
    $this->db->insert($table, $data);
    if ($this->db->affected_rows() > 0) {
      if ($id) {
        return (object) [
          'status' => true,
          'id' => $this->db->insert_id()
        ];
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  public function add_batch($table, $data) {
		$this->db->insert_batch($table, $data);
    if ($this->db->affected_rows() > 0) {
      return true;
    } else {
      return false;
    }
	}

  public function update($table, $data, $column, $value) {
    $this->db->where($column, $value);
    $this->db->update($table, $data);
    if ($this->db->affected_rows() > 0) {
      return true;
    } else {
      return false;
    }
  }

  public function delete($table, $column = 0, $value = 0) {
    if ($column !== 0 && $value !== 0) {
			$this->db->where($column, $value);
		}
    $this->db->delete($table);
    if ($this->db->affected_rows() > 0) {
      $this->db->query('ALTER TABLE '.$table.' AUTO_INCREMENT 1');
      return true;
    } else {
      return false;
    }
  }

  public function get_code($table, $column, $code, $where = 0)
  {
		if ($where !== 0) {
			$query = $this->db->query("
			SELECT max($column) AS code FROM $table WHERE '$where->column' = '$where->value' AND $column LIKE '%$code%'
			");
		} else {
			$query = $this->db->query("
				SELECT max($column) AS code FROM $table WHERE $column LIKE '%$code%'
				");
		}
    return $query;
  }

	public function get_row($table, $multi_where = 0, $multi_keyword = 0, $date_range = 0, $or_where = 0) 
	{
		if ($multi_keyword != 0) 
		{
      if (count($multi_keyword) > 1) 
			{
        $this->db->group_start();
        foreach (array_slice($multi_keyword, 0, 1) as $field => $val) 
				{
          $this->db->like($field, $val);
        }
        foreach (array_slice($multi_keyword, 1) as $field => $val) 
				{
          $this->db->or_like($field, $val);
        }
        $this->db->group_end();
      } 
			else 
			{
        foreach ($multi_keyword as $field => $val) 
				{
          $this->db->like($field, $val);
        }
      }
    }
		
		if ($date_range != 0) 
		{
			$this->db->where($date_range['column'] . ' >=', $date_range['start_date']);
      $this->db->where($date_range['column'] . ' <=', $date_range['end_date']);
    }
		
		if ($multi_where != 0) 
		{
      foreach ($multi_where as $field => $val) 
			{
        if($val != 'All') 
				{
          $this->db->where($field, $val);
        }
      }
    }

		if ($or_where != 0) 
		{
      foreach ($or_where as $field => $val) 
			{
        $this->db->or_where($field, $val);
      }
    }
		
    $q = $this->db->get($table);
    return $q->num_rows();
  }

  // get_data_page
  public function get_data_page($table, $multi_where = 0, $multi_keyword = 0, $paging = 0, $date_range = 0, $sorting = 0, $or_where = 0)
  {
		if ($multi_keyword != 0) 
		{
      if (count($multi_keyword) > 1) 
			{
        $this->db->group_start();
        foreach (array_slice($multi_keyword, 0, 1) as $field => $val) 
				{
          $this->db->like($field, $val);
        }
        foreach (array_slice($multi_keyword, 1) as $field => $val) 
				{
          $this->db->or_like($field, $val);
        }
        $this->db->group_end();
      } 
			else 
			{
        foreach ($multi_keyword as $field => $val) 
				{
          $this->db->like($field, $val);
        }
      }
    }
		
		if ($date_range != 0) 
		{
      $this->db->where($date_range['column'] . ' >=', $date_range['start_date']);
      $this->db->where($date_range['column'] . ' <=', $date_range['end_date']);
    }

		if ($multi_where != 0) 
		{
      foreach ($multi_where as $field => $val) 
			{
        if($val !== 'All') 
				{
          $this->db->where($field, $val);
        }
      }
    }

		if ($or_where != 0) 
		{
      foreach ($or_where as $field => $val) 
			{
        $this->db->or_where($field, $val);
      }
    }

    if ($paging != 0) 
		{
      $this->db->limit($paging['limit'], $paging['start']);
    }

    if ($sorting !== 0) 
		{
      $this->db->order_by($sorting->field, $sorting->order);
    }

		if ($this->db->field_exists('createdDate', $table))
    {
			$this->db->order_by('createdDate', 'DESC');
    }

    $q = $this->db->get($table);

    return $q;
  }
}
