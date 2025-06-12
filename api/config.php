<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "etherealechoes";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Set the character set to utf8mb4 to support emojis
$conn->set_charset("utf8mb4");
?>