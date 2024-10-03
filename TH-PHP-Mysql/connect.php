<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quan li san pham dien tu";

$conn = new mysqli($servername, $username, $password);
$conn->select_db($dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
