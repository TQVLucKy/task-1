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
        375: {
            slidesPerView: 1,
        },
        1001: {
            slidesPerView: 4,
        },
    }
});
var swiperheaderight = new Swiper(".dropdown-content-results", {
    slidesPerView: 2,
    spaceBetween: 10,
    hashNavigation: {
        watchState: true,
    },
    breakpoints: {
        375: {
            slidesPerView: 2,
        },
    }
});

const swipercollectionlist = new Swiper('.collectionlist', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});



var search = document.querySelectorAll(".search");
var formsearch = document.querySelector(".formsearch")
search.forEach(function(element) {
    element.addEventListener("click", function () {
        formsearch.classList.toggle("active");
    });
});
var searchclose = document.querySelector(".search-close");
searchclose.addEventListener('click', function () {
    formsearch.classList.toggle("active");
})
document.addEventListener('DOMContentLoaded', function () {
    const buttonheadertable = document.querySelectorAll('.section-header-tablist .tablist-button');
    const btnproductlist = document.querySelectorAll('.productlist');


    const buttonselectionwrapper = document.querySelectorAll('.product-item-selecttionwrapper .button-selectionwrapper');

    buttonheadertable[0].classList.add('active');
    btnproductlist[0].classList.remove('hidden');
    btnproductlist[0].classList.add('show');
    buttonheadertable.forEach(button => {
        button.addEventListener('click', function () {
            buttonheadertable.forEach(btn => btn.classList.remove('active'));
            btnproductlist.forEach(btn => {
                btn.classList.remove('show');
                btn.classList.add('hidden');
            });

            this.classList.add('active');
            const category = button.getAttribute('data-category');
            const selectedProductList = document.getElementById(`${category}-product`)


            selectedProductList.classList.remove('hidden');
            setTimeout(() => {
                selectedProductList.classList.add('show')
            }, 0);
        });
    });
    buttonselectionwrapper[0].classList.add('active');
    buttonselectionwrapper.forEach(button => {
        button.addEventListener('click', function () {
            buttonselectionwrapper.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        })
    })
});

const menu = document.getElementById('menu');
var panels = document.querySelectorAll(".panel");
var acc = document.querySelectorAll(".accordion");
var i;


acc.forEach(function (accordion, index) {
    accordion.addEventListener('click', function () {
        // Thêm hoặc xóa showpanel cho phần tử panel
        panels[index].classList.toggle("showpanel");
    });
});
$(".close-menu-left").on("click",function(){
    menu.classList.remove("show");
})
$('.menu-button').on("click",function(){
    menu.classList.add("show");
})

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
    });
}
const cart= document.getElementById("cart");
$(".header-cart").on('click',function(){
    cart.classList.add("showcart");
    document.body.classList.toggle("no-scroll");
    document.documentElement.classList.toggle("no-scroll");
    cart.classList.remove("no-scroll");
})
$(".drawer-close").on("click",function(){
    cart.classList.remove("showcart");
    document.body.classList.toggle("no-scroll");
    document.documentElement.classList.toggle("no-scroll");

})