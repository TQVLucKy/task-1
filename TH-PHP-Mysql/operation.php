<?php
require "connect.php";

// function uploadImage($image) {
//     $targetDir = "img/"; 
//     $targetFile = $targetDir . basename($image["name"]);
//     $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

//     $check = getimagesize($image["tmp_name"]);
//     if ($check === false) {
//         return false;
//     }

//     if (file_exists($targetFile)) {
//         return false;
//     }

//     if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
//         return false;
//     }

//     if (move_uploaded_file($image["tmp_name"], $targetFile)) {
//         return basename($image["name"]);
//     } else {
//         return false;
//     }
// }
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $action = $_POST['action'];

    //ADD
    if ($action === 'add') {
        $sku = htmlspecialchars($_POST['sku']);
        $name = htmlspecialchars($_POST['name']);
        $category = htmlspecialchars($_POST['categories']);
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $image = $_FILES['image']['name'];
            if (move_uploaded_file($_FILES['image']['tmp_name'], 'img/' . $image)) {
                date_default_timezone_set('Asia/HO_CHI_MINH');
                $create_date = date("Y-m-d");

                $sql = "INSERT INTO sanpham (sku,name,image,category_ids,create_date) VALUES (?,?,?,?,?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("sssss", $sku, $name, $image, $category, $create_date);
                if ($stmt->execute())
                    echo "Add success";
                else echo "Add fail" . $stmt->error;
            } else echo "Failed to upload image";
        } else echo "No image uploaded or error occurred";
    }

    // UPDATE
    if ($action === 'update') {
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        $sku = isset($_POST['sku']) ? $_POST['sku'] : null;
        $name = isset($_POST['name']) ? $_POST['name'] : null;
        $category = isset($_POST['category']) ? $_POST['category'] : null;
        date_default_timezone_set('Asia/HO_CHI_MINH');
        $update_date = date("Y-m-d");
        
        $image=null;
        if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
            $image = $_FILES['image']['name'];
            if(move_uploaded_file($_FILES['image']['tmp_name'], 'img/' . $image))
                unlink("img/".$_POST["oldimage"]);
        }else{
            $image=$_POST['oldimage'];
        }
        $sql = "UPDATE sanpham
                SET sku=?, name=?,image=?,category_ids=?,update_date=?
                WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", $sku, $name, $image,$category, $update_date, $id);
        if($stmt->execute())
            echo "Update success";
        else echo "Update fail";
    }

    //DELETE
    if ($action === 'delete') {
        $id = isset($_POST['id']) ? $_POST['id'] : null;
        if ($id == null)
            return "Product do not exist";
        $sql = "DELETE FROM sanpham where id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $id);
        if ($stmt->execute()){
            unlink($_POST["image"]);
            echo "Delete success";
        }
        else echo "Delete fail" . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}
