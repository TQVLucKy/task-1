
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
    <div class="container">
        <h2>Product List</h2>
        <button id="show-create-product">create product</button>

        <div class="create-product" style="display: none;">
            <form action="" id="product-form" method="post">
                <label>sku:</label>
                <input type="text" name="sku" placeholder="input sku" required><br>
                <label>name:</label>
                <input type="text" name="name" placeholder="input name" required><br>
                <label>image:</label>
                <input type="file" name="image"  required><br>
                <label>categories:</label>
                <input type="text" name="categories" placeholder="input categories (ex: box,pen)" required><br>
                <input type="submit" name="subcreproduct" value="submit">
            </form>
        </div>

        <table id="data-table" class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>sku</th>
                    <th>name</th>
                    <th>image</th>
                    <th>create_date</th>
                    <th>categorys</th>
                    <th>operation</th>
                </tr>
            </thead>
            <tbody>
                <!-- add with ajax -->
            </tbody>
        </table>
        <div id="pagination" style="display:flex;gap:10px;justify-content:center;">
            <button id="prev-page">Previous</button>
            <span id="page-numbers"></span>
            <button id="next-page">Next</button>

        </div>
        <script src="mv.js"></script>
</body>

</html>