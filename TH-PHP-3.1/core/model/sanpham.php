<?php
class sanpham
{
    private $conn;
    public $id;
    public $sku;
    public $category_ids;
    public $name;
    public $description;
    public $image;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function show($page, $rowsPerPage)
    {

        $sql = "SELECT COUNT(id) as count FROM sanpham";
        $result_page = $this->conn->query($sql);
        $total_rows = $result_page->fetch_assoc()['count'];
        $total_pages = ceil($total_rows / $rowsPerPage);

        $sql = "SELECT id, sku, name, image, create_date, category_ids FROM sanpham LIMIT ?, ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ii", $page, $rowsPerPage);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row; 
            }
        }

        return [
            'data' => $data,
            'total_pages' => $total_pages
        ];
    }


    public function create()
    {
        date_default_timezone_set('Asia/HO_CHI_MINH');
        $create_date = date("Y-m-d");
        $sql = "INSERT INTO sanpham (sku,name,image,category_ids,create_date) VALUES (?,?,?,?,?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssss", $this->sku, $this->name, $this->image, $this->category_ids, $create_date);
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function edit()
    {
        date_default_timezone_set('Asia/HO_CHI_MINH');
        $create_date = date("Y-m-d");
        $sql = "UPDATE sanpham
        SET sku=?, name=?,image=?,category_ids=?,update_date=?
        WHERE id=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssi",  $this->sku, $this->name, $this->image, $this->category_ids, $create_date, $this->id);
        if ($stmt->execute())
            return true;
        return false;
    }

    public function delete()
    {
        $sql = "DELETE FROM sanpham where id=?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $this->id);
        if ($stmt->execute()) {
            unlink($_POST["image"]);
            return true;
        }
        return false;
    }
}
