    <?php

    require_once '../core/model/DB.php';
    require_once '../core/model/sanpham.php';

    class HomeController
    {
        private $db;
        private $sanpham;

        public function __construct()
        {
            $this->db = (new DB())->getConnection();
            $this->sanpham = new sanpham($this->db);
        }
        public function index()
        {
            $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
            $rowsPerPage = isset($_GET['rows_per_page']) ? (int)$_GET['rows_per_page'] : 2;
            $offset = ($page - 1) * $rowsPerPage;

            $products = $this->sanpham->show($offset, $rowsPerPage);

            if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
                // Nếu là yêu cầu AJAX, trả về dữ liệu sản phẩm
                if (!empty($products['data'])) {
                    foreach ($products['data'] as $product) {
                        $categorys = str_replace(array('[', ']'), "", $product["category_ids"]);
                        echo '<tr>';
                        echo '<td data-id="' . $product['id'] . '">' . $product['id'] . '</td>';
                        echo '<td data-sku="' . $product['sku'] . '" data-editable="true">' . $product['sku'] . '</td>';
                        echo '<td data-name="' . $product['name'] . '" data-editable="true">' . $product['name'] . '</td>';
                        echo '<td data-image="' . $product['image'] . '" data-editable="true"><img src="img/' . $product['image'] . '" style="max-width:200px;max-height:200px"></td>';
                        echo '<td>' . $product['create_date'] . '</td>';
                        echo '<td data-category="' . $categorys . '" data-editable="true">' . $categorys . '</td>';
                        echo '<td>';
                        echo '<button name="edit">Edit</button><br>';
                        echo '<button name="delete">Delete</button>';
                        echo '</td>';
                        echo '</tr>';
                    }
                } else {
                    echo '<tr><td colspan="7">No results found</td></tr>';
                }
                return; // Kết thúc hàm tại đây
            }

            require '../core/view/home.php';
        }

        public function create()
        {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $sku = htmlspecialchars($_POST['sku']);
                $name = htmlspecialchars($_POST['name']);
                $category_ids = htmlspecialchars($_POST['categories']);
                if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                    $image = $_FILES['image']['name'];
                    if (move_uploaded_file($_FILES['image']['tmp_name'], 'img/' . $image)) {
                        echo "File image upload successfully";
                    } else {
                        echo "Error file image";
                        return;
                    }
                }

                $this->sanpham->sku = $sku;
                $this->sanpham->name = $name;
                $this->sanpham->category_ids = $category_ids;
                $this->sanpham->image = $image;
                if ($this->sanpham->create()) {
                    echo "Product add successfully";
                } else {
                    echo "Error add product";
                }
            }
        }

        public function edit()
        {
            $id = isset($_POST['id']) ? $_POST['id'] : null;
            $sku = isset($_POST['sku']) ? $_POST['sku'] : null;
            $name = isset($_POST['name']) ? $_POST['name'] : null;
            $category_ids = isset($_POST['category']) ? $_POST['category'] : null;
            $image = null;
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $image = $_FILES['image']['name'];
                if (move_uploaded_file($_FILES['image']['tmp_name'], 'img/' . $image))
                    unlink("img/" . $_POST["oldimage"]);
            } else {
                $image = $_POST['oldimage'];
            }
            $this->sanpham->id = $id;
            $this->sanpham->sku = $sku;
            $this->sanpham->name = $name;
            $this->sanpham->category_ids = $category_ids;
            $this->sanpham->image = $image;
            if ($this->sanpham->edit())
                echo "Edit successfully";
            else echo "Error edit";
        }

        public function delete(){
            $id = isset($_POST['id']) ? $_POST['id'] : null;
            $this->sanpham->id=$id;
            if($this->sanpham->delete())
                echo "Delete successfully";
            else echo "Something wrong with product";
        }
    }

    ?>