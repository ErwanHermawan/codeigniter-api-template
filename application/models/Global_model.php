<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Global_model extends CI_Model {
	
	public function __construct() {
		parent::__construct();
	}
	
	/**
	 * Fetch data from the database with custom conditions and options.
	 *
	 * @param array $data {
	 *   Array of parameters to customize the query.
	 *
	 *   @type string|null $select      Fields to select. If null, selects all fields.
	 *   @type array|null  $where       Associative array of fields and values for the WHERE clause.
	 *   @type array|null  $or_where    Associative array of fields and values for the OR WHERE clause.
	 *   @type array|null  $search      Associative array for the LIKE search, with field => value pairs.
	 *   @type array|null  $sorting     {
	 *     Array to define sorting options.
	 *     @type string $field The field to sort by.
	 *     @type string $order The order of sorting (ASC or DESC).
	 *   }
	 *   @type int|null    $limit       Limit the number of results.
	 *   @type int|null    $offset      The offset for the limit (for pagination).
	 *   @type string|null $output_data The output format, either 'result_array', 'row', or 'num_rows'.
	 *   @type string      $table       The name of the table to query.
	 * }
	 *
	 * @return array|object|int|null
	 *   Returns the result of the query based on the requested output type:
	 *   - 'result_array': Returns an array of results (default).
	 *   - 'row': Returns a single row as an object.
	 *   - 'num_rows': Returns the number of rows.
	 */
	public function get_data($data = [])
	{
		// Select custom data
		if (!empty($data['select'])) {
			$this->db->select($data['select']);
		}

		// Where clause
		if (!empty($data['where'])) {
			foreach ($data['where'] as $field => $val) {
				if ($val != 'all') {
					$this->db->where($field, $val);
				}
			}
		}

		// Or Where clause
		if (!empty($data['or_where'])) {
			foreach ($data['or_where'] as $field => $val) {
				$this->db->or_where($field, $val);
			}
		}

		// Like clause (search)
		if (!empty($data['search'])) {
			$this->db->group_start();
			$first = true;

			foreach ($data['search'] as $field => $val) {
				$val_array = json_decode($val);

				if ($val_array && is_array($val_array)) {
					foreach ($val_array as $new_val) {
						$first ? $this->db->where($field, $new_val) : $this->db->or_where($field, $new_val);
						$first = false;
					}
				} else {
					$first ? $this->db->like($field, $val) : $this->db->or_like($field, $val);
					$first = false;
				}
			}

			$this->db->group_end();
		}

		// Sorting
		if (!empty($data['sorting'])) {
			$this->db->order_by($data['sorting']['field'], $data['sorting']['order']);
		}

		// Limit and offset
		if (!empty($data['limit'])) {
			$offset = !empty($data['offset']) ? $data['offset'] : 0;
			$this->db->limit($data['limit'], $offset);
		}

		// Get query result
		$q = $this->db->get($data['table']);

		// Output data handling
		switch ($data['output_data'] ?? 'result_array') {
			case 'row':
				return $q->num_rows() > 0 ? $q->row() : null;
			case 'num_rows':
				return $q->num_rows();
			default:
				return $q->result_array();
		}
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

}
