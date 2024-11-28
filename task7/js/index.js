$(document).ready(function () {
    let resizeTimeoutOverflow;
    let resizeTimeoutProduct;

    function checkOverflow() {
        $('.layer-tabs .tab-items').each(function () {
            const $tabItems = $(this);

            if ($tabItems[0].scrollWidth > $tabItems.outerWidth()) {
                $tabItems.addClass('layer-items-overflow');
            } else {
                $tabItems.removeClass('layer-items-overflow');
            }
        });
    }

    $(window).resize(function () {
        clearTimeout(resizeTimeoutOverflow);
        resizeTimeoutOverflow = setTimeout(checkOverflow, 200);
    });

    checkOverflow();

    $('.tab-item').on('click', function () {
        const $parentTabItems = $(this).closest('.tab-items');

        $parentTabItems.find('.tab-item').removeClass("active");
        $(this).addClass("active");
    })


    function handleProductChange() {
        if ($(window).width() <= 768) {
            var selectedRow1 = $('[data-row="1"]').val();
            var selectedRow2 = $('[data-row="2"]').val();


            $('.layer-list').hide();

            $('[data-row="' + selectedRow1 + '"]').show().css('order', 1);
            $('[data-row="' + selectedRow2 + '"]').show().css('order', 2);
        } else {
            $('.layer-list').show().css('order', '');
        }

    }

    $(window).resize(function () {
        clearTimeout(resizeTimeoutProduct);
        resizeTimeoutProduct = setTimeout(handleProductChange, 50);
    });
    $('.button-product').on('change', function () {
        handleProductChange();
    });
    handleProductChange();
});

