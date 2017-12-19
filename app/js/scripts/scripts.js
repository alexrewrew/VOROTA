$(document).ready(function () {
    "use strict";
    //menu trigger

    $("main").click(function () {
        if ($('body').hasClass("open")) {
            $('body').toggleClass("open");
            enableScroll();
        }
    });


    $('#disable').click(function (e) {
        e.preventDefault();
        $('body').toggleClass("open");
        if($('body').hasClass('open')) {
            disableScroll();
        } else {
            enableScroll();
        }
    });

    //
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) { // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }


    //



    //modal plugin
    $(".inline").modaal();
    $('.my-link').modaal('close');

    //select plugin
    $(".chosen-select").chosen({disable_search_threshold: 100});
    $(".chosen-image").chosenImage({disable_search_threshold: 100});

    //sliders
    $(".slider-discount").slick({
        slide: "a",
        arrows: false,
        autoplaySpeed: 1500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    variableWidth: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    centerMode: true,
                    variableWidth: true
                }
            }
        ]
    });

    $('.slider-article-big').on('init reInit afterChange', function (event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.slider-counter').text(i + '/' + slick.slideCount);
    });

    $('.slider-article-big').slick({
        slide: '.img-slider-item',
        arrows: true,
        autoplaySpeed: 1500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<div class='arrow arrow-left'><img src='img/icons/arrow-left.svg' title='' alt=''></div>",
        nextArrow: "<div class='arrow arrow-right'><img src='img/icons/arrow-right.svg' title='' alt=''></div>"
    });

    $('.slider-aside').slick({
        responsive: [
            {
                breakpoint: 6000,
                settings: 'unslick'
            },
            {
                breakpoint: 768,
                settings: {
                    slide: 'li',
                    arrows: false,
                    autoplaySpeed: 1500,
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true
                }
            }
        ]
    });





    // menu scroll
    var tempScrollTop, currentScrollTop = 0;

    $(document).scroll(function () {
        if ($(document).scrollTop() < 0) {
            currentScrollTop = 0;
        } else {
            currentScrollTop = $(document).scrollTop();
        }
        if (tempScrollTop < currentScrollTop) {
            $('.nav-bottom').addClass('hidden');
        } else if (tempScrollTop > currentScrollTop) {
            $('.nav-bottom').removeClass('hidden');
        }
        tempScrollTop = currentScrollTop;

        if ($(this).scrollTop() > 0) {
            $('.nav-index').removeClass('nav-transparent');
        }
        else {
            $('.nav-index').addClass('nav-transparent');
        }
    });

    //search link
    $(".link-search").click(function (e) {
        e.preventDefault();
        $(".search-input").toggleClass('visible');
        $(this).toggleClass('active');
    });

    //map link
    $('.link-map').click(function (e) {
        e.preventDefault();
    });

    //dropdown menu
    $('.icon-dropdown--link-list a').hover(function () {
        var a = $(this).attr('data-to');
        $('.icon-dropdown--link-list a').removeClass('active');
        $('.icon-dropdown-description').removeClass('active');
        $(this).toggleClass('active');
        $('.icon-dropdown-description[data-id=' + a + ']').addClass('active');
    });
    $('.icon-container').hover(function () {
        $('.icon-dropdown--link-list a').removeClass('active');
        $('.icon-dropdown-description').removeClass('active');
        $('.icon-dropdown--link-list li:first-child a').addClass('active');
        $('.icon-dropdown-description:first-child').addClass('active');
    });



    //accordion
    $("#accord").accordion({
        heightStyle: "content"
    });



});

$(window).on("load resize", function () {
    "use strict";
    if (window.matchMedia("(max-width: 767px)").matches) {
        $("#navicontacts").appendTo(".nav-bottom .container .row");
        $("#navitop").prependTo(".nav-bottom .container .row");
        $(".nav-bottom").prependTo("body");
    } else {
        $("#navitop").appendTo(".nav-border-bottom .row");
        $("#navicontacts").appendTo(".nav-border-bottom .row");
        $(".nav-bottom").prependTo("nav");
    }

    if (window.matchMedia("(max-width: 1023px)").matches) {
        $('#discount-row').appendTo('#product-col');
    } else {
        $('#discount-row').appendTo('#discount-col');
    }
});


