$(document).ready(function () {
    var cityName, districtName, wardName;

    $.ajax({
        url: "https://provinces.open-api.vn/api/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var city = "";
            city += "<select id='city-select'>"
            city += "<option value=''>Chọn tỉnh thành</option>"
            data.forEach(title => {
                city += "<option value='" + title.code + "'>" + title.name + "</option>"
            })
            city += "</select>"
            $("#city").html(city);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Có lỗi xảy ra: ", textStatus, errorThrown);
        }
    });

    $(document).on("change", "#city-select", function () {
        var cityCode = $(this).val();
        cityName = $(this).find("option:selected").text(); 

        if (cityCode) {
            $.ajax({
                url: "https://provinces.open-api.vn/api/p/" + cityCode + "?depth=2",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var district = "<label>Quận huyện</label><br>";
                    district += "<select id='district-select'>"
                    district += "<option value=''>Chọn quận huyện</option>"
                    data.districts.forEach(function (title) {
                        district += "<option value='" + title.code + "'>" + title.name + "</option>"
                    })
                    district += "</select>"
                    $("#district").html(district);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Có lỗi xảy ra: ", textStatus, errorThrown);
                }
            });
        }
    });

    $(document).on("change", "#district-select", function () {
        var districtCode = $(this).val();
        districtName = $(this).find("option:selected").text(); 

        if (districtCode) {
            $.ajax({
                url: "https://provinces.open-api.vn/api/d/" + districtCode + "?depth=2",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var ward = "<label>Xã</label><br>";
                    ward += "<select id='ward-select'>"
                    ward += "<option value=''>Chọn phường xã</option>"
                    data.wards.forEach(function (title) {
                        ward += "<option value='" + title.code + "'>" + title.name + "</option>"
                    })
                    ward += "</select>"
                    $("#ward").html(ward);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Có lỗi xảy ra: ", textStatus, errorThrown);
                }
            });
        }
    });

    $(document).on("change", "#city-select, #district-select, #ward-select", function () {
        wardName = $("#ward-select").find("option:selected").text(); 

        if ($("#city-select").val() && $("#district-select").val() && $("#ward-select").val()) {
            $("#submit-btn").prop("disabled", false);
        } else {
            $("#submit-btn").prop("disabled", true);
        }
    });

    $("#submit-btn").click(function (event) {
        event.preventDefault();

        if (cityName && districtName && wardName) {
            $("#result").html("Tỉnh/Thành: " + cityName + ", Quận/Huyện: " + districtName + ", Phường/Xã: " + wardName);
        } else {
            $("#result").html("Vui lòng chọn đầy đủ Tỉnh/Thành, Quận/Huyện và Phường/Xã.");
        }
    });
});
