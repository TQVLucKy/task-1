var swiper = new Swiper(".productlist", {
    slidesPerView: 4,
    spaceBetween: 10,
    hashNavigation: {
        watchState: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        992: {
            slidesPerView: 4,
        },
    }
});
var swiperheaderight = new Swiper(".dropdown-content-results", {
    slidesPerView: 2,
    spaceBetween: 10,
    direction: 'horizontal',
    // freeMode:true,
    hashNavigation: {
        watchState: true,
    },
    breakpoints: {
        1200: {
            slidesPerView: 4,
            direction: 'vertical',
        },
        768: {
            slidesPerView: 3,
            direction: 'horizontal',
        },
        576: {
            slidesPerView: 2,
            direction: 'horizontal',
        }
    },
    loop: false
});


const swipercollectionlist = new Swiper('.collectionlist', {
    // loop: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    }
});


$(".search").each(function () {
    $(this).on("click", function () {
        $(".formsearch").toggleClass("active");
    });
});

$(".search-close").on("click", function () {
    $(".formsearch").toggleClass("active");
});

document.addEventListener('DOMContentLoaded', function () {
    const buttonheadertable = $('.section-header-tablist .tablist-button');
    const btnproductlist = $('.productlist');
    const buttonselectionwrapper = $('.product-item-selecttionwrapper .button-selectionwrapper');

    buttonheadertable.eq(0).addClass('active');
    btnproductlist.eq(0).removeClass('hidden').addClass('show');

    buttonheadertable.on('click', function () {
        buttonheadertable.removeClass('active');
        btnproductlist.removeClass('show').addClass('hidden');
        $(this).addClass('active');
        const category = $(this).data('category');
        const selectedProductList = $(`#${category}-product`);
        selectedProductList.removeClass('hidden');
        setTimeout(() => {
            selectedProductList.addClass('show');
        }, 0);

        buttonselectionwrapper.eq(0).addClass('active');
        buttonselectionwrapper.on('click', function () {
            buttonselectionwrapper.removeClass('active');
            $(this).addClass('active');
        });
    });
});

const menu = $('#menu');
const cart = $('#cart');
const overlay = $('#overlay');

function addOverlay() {
    overlay.css('display', 'block');
    $('body, html').toggleClass('no-scroll');
}
function removeOverlay() {
    overlay.css('display', 'none');
    $('body, html').toggleClass('no-scroll');
}

$('.accordion').each(function (index) {
    $(this).click(function () {
        $('.panel').eq(index).toggleClass('showpanel');
        $(this).toggleClass('active');
    });
});


$(".close-menu-left").on("click", function () {
    menu.removeClass("show");
    removeOverlay();
});

$('.menu-button').on("click", function () {
    menu.addClass("show");
    addOverlay();
    menu.removeClass("no-scroll");
});

$(".header-cart").on('click', function () {
    cart.addClass("showcart");
    addOverlay();
    cart.removeClass("no-scroll");
});

$(".drawer-close").on("click", function () {
    cart.removeClass("showcart");
    removeOverlay();
});

overlay.on('click', function () {
    cart.removeClass("showcart");
    menu.removeClass("show");
    removeOverlay();
});
