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
            <form action="" id="product-form" method="post" enctype="multipart/form-data">
                <label>sku:</label>
                <input type="text" name="sku" placeholder="input sku"><br>
                <label>name:</label>
                <input type="text" name="name" placeholder="input name"><br>
                <label>image:</label>
                <input type="file" name="image"><br>
                <label>categories:</label>
                <input type="text" name="categories" placeholder="input categories (ex: box,pen)"><br>
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
                <!-- <?php if (!empty($products['data'])): ?>
                    <?php foreach ($products['data'] as $product): ?>
                        <tr>
                            <td data-id="<?= $product['id'] ?>"> <?= $product['id'] ?></td>
                            <td data-sku="<?= $product['sku'] ?>" data-editable="true"> <?= $product['sku'] ?></td>
                            <td data-name="<?= $product['name'] ?>" data-editable="true"> <?= $product['name'] ?></td>
                            <td data-image="<?= $product['image'] ?>" data-editable="true">
                                <img src="img/<?= $product['image'] ?>" style="max-width:200px;max-height:200px">
                            </td>
                            <td><?php echo $product['create_date']; ?></td>
                            <?php $categorys = str_replace(array('[', ']'), "", $product["category_ids"]); ?>
                            <td data-category="<?php echo $categorys ?>" data-editable="true"> <?php echo $categorys ?></td>
                            <td>
                                <button name='edit'>Edit</button><br>
                                <button name='delete'>Delete</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="7">No results found</td>
                    </tr>
                <?php endif; ?> -->
            </tbody>

        </table>


        <div id="pagination" style="display:flex;gap:10px;justify-content:center;">
            <button id="prev-page">Previous</button>
            <?php for ($i = 1; $i <= $products['total_pages']; $i++): ?>
                <button class="page-number" data-page="<?= $i ?>"><?= $i ?></button>
            <?php endfor ?>
            <button id="next-page">Next</button>
        </div>
        <script>
            const totalPages = <?= json_encode($products['total_pages']) ?>;
        </script>
        <script src="../public/js/mv.js"></script>
</body>

</html>