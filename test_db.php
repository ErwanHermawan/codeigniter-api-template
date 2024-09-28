<?php
require 'vendor/autoload.php';

// Load environment variables from the .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
	$dotenv->load();
	echo "Environment variables loaded successfully.\n";
} catch (Exception $e) {
	echo "Error loading environment variables: " . $e->getMessage() . "\n";
}
// Fetch database connection details from environment variables
$host = $_ENV['DB_HOST'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

// Attempt to connect to MySQL
$mysqli = new mysqli("localhost", "root", "root", "db_example");

// Check connection
if ($mysqli->connect_error) {
	die("Connection failed: " . $mysqli->connect_error);
}
echo "Connected successfully";
$mysqli->close();
