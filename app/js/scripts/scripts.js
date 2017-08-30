$(document).ready(function () {
    "use strict";

    $(".inline").modaal();
    $('.my-link').modaal('close');

    //select
    $(".chosen-select").chosen({disable_search_threshold: 10});
    $(".chosen-image").chosenImage({disable_search_threshold: 10});

    //discount slider
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

    // menu scroll
    var tempScrollTop, currentScrollTop = 0;

    $(document).scroll(function () {

        if($(document).scrollTop() < 0) {
            currentScrollTop = 0;
        } else {
            currentScrollTop = $(document).scrollTop();
        }

        // console.log(currentScrollTop);

        if (tempScrollTop < currentScrollTop && currentScrollTop) {
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
    $(".link-search").click(function () {
        event.preventDefault();
        $(".search-input").toggleClass('visible');
        $(this).toggleClass('active');
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


    //menu trigger
    $(".nav-icon").click(function () {
        event.preventDefault();
        $(this).toggleClass("open");
        $("main").toggleClass("open");
        $("nav").toggleClass("open");
        $("html, body").toggleClass("open-nav");
        $('.nav-bottom').toggleClass('open');
    });

    $("main").click(function () {
        if ($(this).hasClass("open")) {
            $(this).toggleClass("open");
            $(".nav-icon").toggleClass("open");
            $("nav").toggleClass("open");
            $("html,body").toggleClass("open-nav");
        }
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

    $(window).on("load resize", function () {
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

    $(function () {
        $(".accordion").accordion();
    });

    //gallery
    // $('.img-item').magnificPopup({
    //     type: 'image',
    //     gallery:{
    //         enabled:true,
    //         tCounter: '%curr% из %total%'
    //     },
    //     zoom: {
    //         enabled: true, // By default it's false, so don't forget to enable it
    //
    //         duration: 300, // duration of the effect, in milliseconds
    //         easing: 'ease', // CSS transition easing function
    //
    //         opener: function(openerElement) {
    //             return openerElement.is('img') ? openerElement : openerElement.find('img');
    //         }
    //     }
    // });

    $('.link-map').click(function (e) {
        e.preventDefault();
    });

});


