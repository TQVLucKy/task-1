<?php
require "connect.php";


$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$rowsPerPage = isset($_GET['rows_per_page']) ? (int)$_GET['rows_per_page'] : 2;
$offset = ($page - 1) * $rowsPerPage;

//count page
$sql="SELECT COUNT(id) as count FROM sanpham";
$result_page=$conn->query($sql);
$total_rows=$result_page->fetch_assoc()['count'];
$total_pages=ceil($total_rows/$rowsPerPage);

$sql = "SELECT id,sku,name,image,create_date,category_ids
        FROM sanpham LIMIT ?,?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $offset, $rowsPerPage);
$stmt->execute();
$result = $stmt->get_result();
$data="";
if ($result->num_rows > 0) {
    while ($x = $result->fetch_assoc()) {
        $categorys = str_replace(array('[', ']'), "", $x["category_ids"]);
        $data.= "<tr>";
        $data.=  "<td data-id='" . $x['id'] . "'>" . $x['id'] . "</td>";
        $data.=  "<td data-sku='" . $x['sku'] . "' data-editable='true'>" . $x['sku'] . "</td>";
        $data.=  "<td data-name='" . $x['name'] . "' data-editable='true'>" . $x['name'] . "</td>";
        $data.=  '<td data-image="' . $x['image'] . '" data-editable="true"><img src="img/' . $x['image'] . '" style="max-width:200px;max-height:200px"></td>';
        $data.=  "<td>" . $x['create_date'] . "</td>";
        $data.=  "<td data-category='" . $x['category_ids'] . "' data-editable='true'>" . $categorys . "</td>";
        $data.=  "<td><button name='edit'>Edit</button><br><button name='delete'>Delete</button></td>";
        $data.=  "</tr>";
    }
} else {
    $data.=  "<tr><td>No results found</td></tr>";
}
echo json_encode(["data"=>$data,'total_pages'=>$total_pages]);
$stmt->close();
$conn->close();
