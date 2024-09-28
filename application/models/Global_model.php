<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Global_model extends CI_Model {
	
	public function __construct() {
		parent::__construct();
	}
	
	/**
	 * Get data from a table with optional keyword filtering.
	 *
	 * @param string $table The table name.
	 * @param array $multi_keyword An associative array of fields and keywords for filtering.
	 * @param int $limit Limit the number of results.
	 * @param string $sort Sorting order (asc or desc).
	 * @return array Result set as an associative array.
	 */
	public function get_data(string $table, array $multi_keyword = [], int $limit = 0, string $sort = 'asc'): array {
		$this->db->from($table);
		
		if (!empty($multi_keyword)) {
			// Start grouping if there are multiple keywords
			if (count($multi_keyword) > 1) {
				$this->db->group_start();
				// Handle the first keyword as a "LIKE" condition
				$first_field = key($multi_keyword);
				$this->db->like($first_field, $multi_keyword[$first_field]);
				
				// Handle remaining keywords as "OR LIKE" conditions
				foreach (array_slice($multi_keyword, 1) as $field => $val) {
					$this->db->or_like($field, $val);
				}
				$this->db->group_end();
			} else {
				// Single keyword handling
				foreach ($multi_keyword as $field => $val) {
					$this->db->like($field, $val);
				}
			}
		}
		
		// Apply limit if specified
		if ($limit > 0) {
			$this->db->limit($limit);
		}
		
		// Apply sorting based on created_date if the field exists
		if ($this->db->field_exists('created_date', $table)) {
			$this->db->order_by('created_date', $sort);
		}
		
		// Execute the query and return the results
		return $this->db->get()->result_array();
	}
	
	/**
	 * Get data with specific where conditions and sorting.
	 *
	 * @param string $table The table name.
	 * @param array $multi_where Associative array for multi-where conditions.
	 * @param array $or_where Associative array for OR where conditions.
	 * @param object|null $sorting Sorting object with field and order.
	 * @param int $limit Limit the number of results.
	 * @param array $multi_keyword An associative array of fields and keywords for filtering.
	 * @return array Result set as an associative array.
	 */
	public function get_data_where(string $table, array $multi_where = [], array $or_where = [], $sorting = null, int $limit = 0, array $multi_keyword = []): array {
		// Apply multi-where conditions
		if (!empty($multi_where)) {
			foreach ($multi_where as $field => $val) {
				$this->db->where($field, $val);
			}
		}
		
		// Apply or-where conditions
		if (!empty($or_where)) {
			foreach ($or_where as $field => $val) {
				$this->db->or_where($field, $val);
			}
		}
		
		// Apply sorting if provided
		if ($sorting) {
			$this->db->order_by($sorting->field, $sorting->order);
		}
		
		// Apply limit if specified
		if ($limit > 0) {
			$this->db->limit($limit);
		}
		
		// Apply multi-keyword conditions
		if (!empty($multi_keyword)) {
			if (count($multi_keyword) > 1) {
				$this->db->group_start();
				// First keyword as a "LIKE" condition
				$first_field = key($multi_keyword);
				$this->db->like($first_field, $multi_keyword[$first_field]);
				
				// Remaining keywords as "OR LIKE" conditions
				foreach (array_slice($multi_keyword, 1) as $field => $val) {
					$this->db->or_like($field, $val);
				}
				$this->db->group_end();
			} else {
				// Single keyword handling
				foreach ($multi_keyword as $field => $val) {
					$this->db->like($field, $val);
				}
			}
		}
		
		// Execute the query and return the results
		return $this->db->get($table)->result_array();
	}
	
	/**
	 * Get a single row of data from a table.
	 *
	 * @param string $table The table name.
	 * @param string|null $column The column to match.
	 * @param mixed|null $value The value to match.
	 * @param object|null $sort Sorting object with field and order.
	 * @return object|null The matching row or null.
	 */
	public function get_single_data(string $table, ?string $column = null, ?string $value = null, $sort = null): ?object {
		// Apply where condition if column and value are provided
		if ($column !== null && $value !== null) {
			$this->db->where($column, $value);
		}
		
		// Apply sorting if provided
		if ($sort) {
			$this->db->order_by($sort->field, $sort->order);
		}
		
		// Execute the query
		$query = $this->db->get($table);
		
		// Return the single row if exists, otherwise null
		return $query->num_rows() > 0 ? $query->row() : null;
	}
	
	/**
	 * Insert data into a table.
	 *
	 * @param string $table The table name.
	 * @param array $data Data to insert.
	 * @param bool $id Return inserted ID if true.
	 * @return mixed Insert status or inserted ID.
	 */
	public function add(string $table, array $data, bool $id = false) {
		// Insert data into the specified table
		$this->db->insert($table, $data);

		// Check if the insert was successful
		if ($this->db->affected_rows() > 0) {
			// Return the inserted ID if requested
			return $id ? (object) ['status' => true, 'id' => $this->db->insert_id()] : true;
		}

		// Return false if no rows were affected
		return false;
	}
	
	/**
	 * Insert batch data into a table.
	 *
	 * @param string $table The table name.
	 * @param array $data Batch data to insert.
	 * @return bool Insert status.
	 */
	public function add_batch(string $table, array $data): bool {
		// Insert batch data into the specified table
		$this->db->insert_batch($table, $data);

		// Check if any rows were affected by the insert operation
		return $this->db->affected_rows() > 0;
	}
	
	/**
	 * Update a row in a table.
	 *
	 * @param string $table The table name.
	 * @param array $data Data to update.
	 * @param string $column The column to match.
	 * @param mixed $value The value to match.
	 * @return bool Update status.
	 */
	public function update(string $table, array $data, string $column, $value): bool {
		// Set the condition for the update
		$this->db->where($column, $value);
		
		// Perform the update operation
		$this->db->update($table, $data);
		
		// Return true if rows were affected, otherwise false
		return $this->db->affected_rows() > 0;
	}
	
	/**
	 * Delete a row from a table.
	 *
	 * @param string $table The table name.
	 * @param string|null $column The column to match.
	 * @param mixed|null $value The value to match.
	 * @return bool Deletion status.
	 */
	public function delete(string $table, ?string $column = null, $value = null): bool {
		// Set the condition for deletion if column and value are provided
		if ($column !== null && $value !== null) {
			$this->db->where($column, $value);
		}

		// Perform the deletion
		$this->db->delete($table);

		// Check if any rows were affected
		if ($this->db->affected_rows() > 0) {
			// Reset the AUTO_INCREMENT value
			$this->db->query('ALTER TABLE ' . $table . ' AUTO_INCREMENT = 1');
			return true;
		}

		return false; // Return false if no rows were affected
	}
	
	/**
	 * Get the maximum code from a specific column with optional where condition.
	 *
	 * @param string $table The table name.
	 * @param string $column The column to check.
	 * @param string $code The code to match.
	 * @param object|null $where Optional where condition.
	 * @return object|null The row containing the maximum code.
	 */
	public function get_code(string $table, string $column, string $code, $where = null): ?object {
		// Initialize the base query
		$this->db->select_max($column, 'code')->from($table);

		// Check if a 'where' condition is provided
		if ($where !== null) {
			$this->db->where($where->column, $where->value);
		}

		// Use a parameterized LIKE query to prevent SQL injection
		$this->db->like($column, $code);

		// Execute the query and return the result
		$query = $this->db->get();
		return $query->row(); // Return a single row instead of the entire query object
	}
	
	/**
	 * Get the number of rows matching specified criteria.
	 *
	 * @param string $table The table name.
	 * @param array|null $multi_where Multi-where conditions.
	 * @param array|null $multi_keyword Multi-keyword search.
	 * @param array|null $date_range Date range filtering.
	 * @param array|null $or_where OR conditions.
	 * @return int The number of matching rows.
	 */
	public function get_row(string $table, ?array $multi_where = null, ?array $multi_keyword = null, ?array $date_range = null, ?array $or_where = null): int 
	{
		// Handle multi-keyword search
		if ($multi_keyword !== null) {
			if (count($multi_keyword) > 1) {
				$this->db->group_start();
				foreach (array_slice($multi_keyword, 0, 1) as $field => $val) {
					$this->db->like($field, $val);
				}
				foreach (array_slice($multi_keyword, 1) as $field => $val) {
					$this->db->or_like($field, $val);
				}
				$this->db->group_end();
			} else {
				foreach ($multi_keyword as $field => $val) {
					$this->db->like($field, $val);
				}
			}
		}

		// Handle date range filtering
		if ($date_range !== null) {
			$this->db->where($date_range['column'] . ' >=', $date_range['start_date']);
			$this->db->where($date_range['column'] . ' <=', $date_range['end_date']);
		}

		// Handle multi-where conditions
		if ($multi_where !== null) {
			foreach ($multi_where as $field => $val) {
				if ($val !== 'All') {
					$this->db->where($field, $val);
				}
			}
		}

		// Handle OR conditions
		if ($or_where !== null) {
			foreach ($or_where as $field => $val) {
				$this->db->or_where($field, $val);
			}
		}

		// Execute the query
		$query = $this->db->get($table);
		return $query->num_rows(); // Return the number of rows that match the criteria
	}

	/**
	 * Get paginated data with various filtering options.
	 *
	 * @param string $table The table name.
	 * @param array|null $multi_where Multi-where conditions.
	 * @param array|null $multi_keyword Multi-keyword search.
	 * @param array|null $paging Pagination parameters.
	 * @param array|null $date_range Date range filtering.
	 * @param object|null $sorting Sorting object with field and order.
	 * @param array|null $or_where OR conditions.
	 * @return object Query result object.
	 */
	public function get_data_page(string $table, ?array $multi_where = null, ?array $multi_keyword = null, ?array $paging = null, ?array $date_range = null, ?object $sorting = null, ?array $or_where = null): object
	{
		// Handle multi-keyword search
		if ($multi_keyword !== null) {
			if (count($multi_keyword) > 1) {
				$this->db->group_start();
				foreach (array_slice($multi_keyword, 0, 1) as $field => $val) {
					$this->db->like($field, $val);
				}
				foreach (array_slice($multi_keyword, 1) as $field => $val) {
					$this->db->or_like($field, $val);
				}
				$this->db->group_end();
			} else {
				foreach ($multi_keyword as $field => $val) {
					$this->db->like($field, $val);
				}
			}
		}

		// Handle date range filtering
		if ($date_range !== null) {
			$this->db->where($date_range['column'] . ' >=', $date_range['start_date']);
			$this->db->where($date_range['column'] . ' <=', $date_range['end_date']);
		}

		// Handle multi-where conditions
		if ($multi_where !== null) {
			foreach ($multi_where as $field => $val) {
				if ($val !== 'All') {
					$this->db->where($field, $val);
				}
			}
		}

		// Handle OR conditions
		if ($or_where !== null) {
			foreach ($or_where as $field => $val) {
				$this->db->or_where($field, $val);
			}
		}

		// Handle pagination
		if ($paging !== null) {
			$this->db->limit($paging['limit'], $paging['start']);
		}

		// Handle sorting
		if ($sorting !== null) {
			$this->db->order_by($sorting->field, $sorting->order);
		}

		// Ensure created_date is sorted by DESC if it exists
		if ($this->db->field_exists('created_date', $table)) {
			$this->db->order_by('created_date', 'DESC');
		}

		// Execute the query
		$query = $this->db->get($table);
		
		return $query; // Return the query result object
	}

}
