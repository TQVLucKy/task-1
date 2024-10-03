<?php
require "connect.php";

// if($_SERVER["REQUEST_METHOD"]==="POST"){
//     if(isset($_POST["subcreproduct"]) &&$_POST["subcreproduct"]==="submit"){
//         $id= htmlspecialchars($_POST['id']);
//         $sku= htmlspecialchars($_POST['sku']);
//         $name= htmlspecialchars($_POST['name']);
//         $image= htmlspecialchars($_POST['image']);
//         $categories= htmlspecialchars($_POST['categoryies']);
//         date_default_timezone_get('Asia/HO_CHI_MINH');
//         $create_date= date("d-m-Y");
//         $sql= "INSERT INTO sanpham (id,sku,name,image,category_ids,create_date) VALUES (?,?,?,?,?)";
//         $stmt = $conn->prepare($sql);
//         $stmt->bind_param("??????",$id,$sku,$name,$image,$categories,$create_date);
//         $stmt->execute();
//     }
// }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <title>Document</title>
</head>

<body>
    <?php
    $sql = "select id,sku,name,image,create_date,category_ids
        FROM sanpham";
    $result = mysqli_query($conn, $sql);

    ?>
    <div class="container">
        <h2>Product List</h2>
        <!-- <button id="show-create-product">create product</button> -->
        <!-- khi nhấn vào  tạo thì hiển thị form tạo sp -->
        <!-- <div class="create-product">
            <form action="" method="post">
                <label>id:</label>
                <input type="text" name="id" placeholder="input id"><br>
                <label>sku:</label>
                <input type="text" name="sku" placeholder="input sku"><br>
                <label>name:</label>
                <input type="text" name="name" placeholder="input name"><br>
                <label>image:</label>
                <input type="text" name="image" placeholder="select 1 image"><br>
                <label>categories:</label>
                <input type="text" name="categories[]" placeholder="input categories"><br>
                <input type="submit" name="subcreproduct" value="submit">
            </form>
        </div> -->
        <!-- khi nhấn vào sửa hiển thị form sửa sản phẩm -->

        <!-- khi nhấn vào xóa thì tiến hành xóa sản phẩm -->
        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>sku</th>
                    <th>name</th>
                    <th>image</th>
                    <th>create_date</th>
                    <th>categorys</th>
                    <!-- <th>operation</th> -->
                </tr>
            </thead>
            <tbody>
                <?php
                if ($result->num_rows > 0) {
                    while ($x = $result->fetch_assoc()) {
                        $categorys = str_replace(array('[', ']'), "", $x["category_ids"]);
                        echo "<tr>";
                        echo "<td>" . $x['id'] . "</td>";
                        echo "<td>" . $x['sku'] . "</td>";
                        echo "<td>" . $x['name'] . "</td>";
                        echo "<td>" . $x['image'] . "</td>";
                        echo "<td>" . $x['create_date'] . "</td>";
                        echo "<td>" . $categorys . "</td>";
                        // echo "<td><button>sua</button><br><button>xoa</button></td>";
                        echo "</tr>";
                    }
                } ?>
            </tbody>
        </table>
    </div>

</body>

</html>