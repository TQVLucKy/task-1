$(document).ready(function () {

    $("#show-create-product").on("click", function () {
        $(".create-product").toggle();
    })

    //ADD
    $("#product-form").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        formData.append('action', 'add');
        $.ajax({
            url: "operation.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (reponsive) {
                alert(reponsive);
                location.reload();
            },
            error: function (xhr, status, error) {
                alert('Đã có lỗi xảy ra: ' + error);
            }
        })
    });
    //EDIT
    $(document).on('click', "button[name='edit']", function () {
        var $row = $(this).closest("tr");

        if ($(this).text() === 'Edit') {

            $row.find("td[data-editable]").attr('contenteditable', 'true').css("background-color", "#e2e6ea");
            $(this).text('Save');

            //edit image
            var $imageCell = $row.find("td[data-image]");
            var imagesrc = $imageCell.find("img").attr("src");
            $imageCell.html('<input type="file" name="image" accept="img/*"><img src="' + imagesrc + '" style="max-width:200px;max-height:200px">');
        }
        else {
            var formData = new FormData();
            formData.append('action', 'update');
            formData.append('id', $row.find("td[data-id]").text());
            formData.append('sku', $row.find("td[data-sku]").text());
            formData.append('name', $row.find("td[data-name]").text());
            formData.append('category', $row.find("td[data-category]").text());


            var newImage = $row.find("input[type='file'][name='image']")[0].files[0];
            if (newImage) formData.append('image', newImage)
            var imgElement = $row.find("td[data-image] img");
            if (imgElement.length > 0) {
                var oldImage = imgElement.attr("src").replace("img/", "");
                formData.append('oldimage', oldImage);
            }

            formData.append('action', 'update');
            $.ajax({
                url: "operation.php",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (reponsive) {
                    alert(reponsive);
                    location.reload();
                },
                error: function (xhr, status, error) {
                    alert('Đã có lỗi xảy ra: ' + error);
                }
            })
        }
    });


    //DELETE
    $(document).on('click','button[name="delete"]',function() {
        var id = $(this).closest("tr").find("td[data-id]").data("id");
        var image = $(this).closest("tr").find("td[data-image] img").attr("src");
        $.ajax({
            url: "operation.php",
            type: "POST",
            data: {
                id: id,
                image:image,
                action: 'delete'
            },
            success: function (reponsive) {
                alert(reponsive);
                location.reload();
            },
            error: function (xhr, status, error) {
                alert('Đã có lỗi xảy ra: ' + error);
            }
        })
    })

    //Phân trang
    var currentPage = 1;
    var rowsperPage = 2;
    var totalPages = 0;
    function loadData(page) {
        $.ajax({
            url: 'loaddata.php',
            type: "GET",
            data: {
                page: page,
                rows_per_page: rowsperPage
            },
            success: function (reponsive) {
                var data = JSON.parse(reponsive)
                $("#data-table tbody").html(data.data);
                totalPages = data.total_pages;
                updateNumPage();
                checkFirstLast();
            },
            error: function (xhr, status, error) {
                alert("lỗi" + error);
            }
        });
    }

    function updateNumPage() {
        var pageNumbers = '';
        for (var i = 1; i <= totalPages; i++) {
            pageNumbers += '<button class="page-number" data-page="' + i + '">' + i + '</button>';
        }

        $("#page-numbers").css({ "display": "flex", "gap": "10px" })
        $("#page-numbers").html(pageNumbers);

        $('.page-number[data-page="' + currentPage + '"]').hide();
    }

    function checkFirstLast() {
        if (currentPage == 1)
            $('#prev-page').hide();
        else
            $('#prev-page').show();

        if (currentPage == totalPages)
            $('#next-page').hide();
        else
            $('#next-page').show();

    }
    $('#prev-page').click(function () {
        if (currentPage > 1) {
            currentPage--;
            loadData(currentPage);
        }
    })
    $('#next-page').click(function () {
        if (currentPage < totalPages) {
            currentPage++;
            loadData(currentPage);
        }
    })
    $(document).on("click", '.page-number', function () {
        var page = $(this).data('page');
        currentPage = page;
        loadData(currentPage);

    })
    loadData(currentPage);

})