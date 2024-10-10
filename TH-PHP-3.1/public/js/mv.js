$(document).ready(function () {


    $("#show-create-product").on("click", function () {
        $(".create-product").toggle();
    })

    //ADD
    $("#product-form").submit(function (e) {
        e.preventDefault();

        var formData = new FormData(this);
        $.ajax({
            url: "home/create",
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
            $.ajax({
                url: "home/edit",
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
    $(document).on('click', 'button[name="delete"]', function () {
        var id = $(this).closest("tr").find("td[data-id]").data("id");
        var image = $(this).closest("tr").find("td[data-image] img").attr("src");
        $.ajax({
            url: "home/delete",
            type: "POST",
            data: {
                id: id,
                image: image
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
    // var currentPage = 1;
    // var rowsperPage = 2;
    // var totalPages = 0;
    // $(document).on('click', '.page-number', function () {
    //     var page = $(this).data('page');
    //     $.ajax({
    //         url: '../public/index.php',
    //         method: 'GET',
    //         data: {
    //             currentPage: page,
    //             rows_per_page: rowsperPage
    //         },
    //         success: function (response) {
    //             alert(response);
    //             $('#data-table tbody').html(response.data);
    //         },
    //         error: function (xhr, status, error) {
    //             alert('Error: ' + error);
    //         }
    //     });
    // });
    var currentPage = 1;
    var rowsPerPage = 2;
    loadData(currentPage, rowsPerPage)

    $('#pagination').on('click', '.page-number', function () {
        currentPage = $(this).data('page');
        loadData(currentPage, rowsPerPage);
    });

    $('#prev-page').click(function () {
        if (currentPage > 1) {
            currentPage--;
            loadData(currentPage, rowsPerPage);
        }
    })
    $('#next-page').click(function () {
        if (currentPage < totalPages) {
            currentPage++;
            loadData(currentPage, rowsPerPage);
        }
    })
    function loadData(currentPage, rowsPerPage) {
        $.ajax({
            url: 'index.php',
            type: "GET",
            data: {
                page: currentPage,
                rows_per_page: rowsPerPage
            },
            success: function (reponsive) {
                $("#data-table tbody").empty().append(reponsive);
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

        $(".page-number").css({
            "display": "flex",
            "gap": "10px",
            'background': 'white',
            'color': 'black',
            "border-radius": "5px",
            'border': '1px solid black'
        })
        $('.page-number[data-page="' + currentPage + '"]')
            .css({
                'background': 'blue',
                'color': 'white'
            });
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

})