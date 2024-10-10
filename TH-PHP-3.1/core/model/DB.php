<?php
require_once '../config/config.php';

class DB
{
    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        // Sử dụng hằng số để kết nối
        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }

        return $this->conn;
    }
}
