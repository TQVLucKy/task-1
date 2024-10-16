$(document).ready(function () {
    const messages = [
        "MID SEASON SALE | Up to 40% off <a href='' style='text-decoration-line:underline;color:white;'>SHOP NOW</a>",
        "<a href='' style='color:white;'>Free Shipping on Orders Over $99</a>",
        "<a href='' style='text-decoration-line:underline;color:white;'>Sign Up</a> to Receive a $10 Welcome Reward",
    ];

    let currentIndex = 0;

    function showNextMessage() {
        const banner = $("#banner");
        const currentContent = messages[currentIndex];

        const newContent = $("<div>").html(currentContent).css({
            position: 'absolute',
            width: "100%",
            top: '100%',
            left: "50%",
            opacity: 0,
            transform: "translate(-50%)"
        });
        banner.append(newContent);

        newContent.animate({
            top: "0",
            opacity: 1
        }, 500, function () { 
            setTimeout(() => {
                const oldContent = banner.children("div").not(newContent).first();
                oldContent.animate({
                    opacity: 0
                }, 10, function () { 
                    $(this).remove();
                });
            }, 10); 
        });

        currentIndex = (currentIndex + 1) % messages.length; 
    }

    setInterval(showNextMessage, 3000);

    $(window).on('scroll', function () {
        if ($(window).width() > 500) {
            const banner = $("#banner");
            if ($(this).scrollTop() < 50) {
                banner.css('display', 'block');
            } else if ($(this).scrollTop() > 100) {
                banner.css('display', 'none');
                $(".dropdown-list").css("top", "88px");
            }
        }
    });

    //overlay
    
});