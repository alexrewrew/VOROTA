$(document).ready(function () {
    "use strict";

    //modal plugin
    $(".inline").modaal();
    $('.my-link').modaal('close');

    //select plugin
    $(".chosen-select").chosen({disable_search_threshold: 10});
    $(".chosen-image").chosenImage({disable_search_threshold: 10});

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

    //menu trigger
    $(".nav-icon").click(function () {
        event.preventDefault();
        $(this).toggleClass("open");
        $("main, nav, .nav-bottom").toggleClass("open");
        $("html, body").toggleClass("open-nav");
    });

    $("main").click(function () {
        if ($(this).hasClass("open")) {
            $(this).toggleClass("open");
            $(".nav-icon, nav, .nav-bottom").toggleClass("open");
            $("html,body").toggleClass("open-nav");
            enableScroll();
        }
    });

    $('#disable').click(function () {
        if($(this).hasClass('open')) {
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

    //accordion
    $("#accord").accordion({
        heightStyle: "content"
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

    /********
     *
     * Calculator script
     *
     * 04.09.2017
     *
     */
    function pricing() {
        var width = Math.ceil(parseInt($("#calc-width").val()) / 100) * 100,
            height = Math.ceil(parseInt($("#calc-height").val()) / 100) * 100,
            wh = width + "x" + height,
            price = prices.price,
            price_sale = prices.sale,
            price_current = price[wh],
            price_current_sale = price_sale[wh],
            out = price_current,
            out_sale = price_current_sale;

        if ($(".color-options").children("li").find(".active").attr("data-color") !== "Белый RAL9003" && $(".color-options").children("li").find(".active").attr("data-color") !== "Коричневый RAL8014") {
            out += price_current * price["Цветные"];
            out_sale += price_current_sale * price_sale["Цветные"];
        }

        if ($("#calc-type-gate").val() === "Филенка") {
            out += price_current * price["Филенка"];
            out_sale += price_current_sale * price_sale["Филенка"];
        } else if ($("#calc-type-gate").val() === "Панорама") {
            out += price_current * price["Панорамная"];
            out_sale += price_current_sale * price_sale["Панорамная"];
        }

        if ($("#calc-open-gate").val() === "Автоматика") {
            if (width * height < 8000000) {
                out += price["Площадь <8"];
                out_sale += price_sale["Площадь <8"];
            }
            else {
                out += price["Площадь >8"];
                out_sale += price_sale["Площадь >8"];
            }
        } else if ($("#calc-open-gate").val() === "Ручное" && $(".calc-mech-dop").children("a").hasClass("active")) {
            out += price["Замок"];
            out_sale += price_sale["Замок"];
        }

        if ($(".calc-window-dop").children("a").hasClass("active")) {
            out += price["Окно"];
            out_sale += price_sale["Окно"];
        }

        if ($(".calc-door-dop").children("a").hasClass("active")) {
            out += price["Дверь"];
            out_sale += price_sale["Дверь"];
        }

        if ($(".calc-mount-dop").children("a").hasClass("active")) {
            out += price["Монтаж"];
            out_sale += price_sale["Монтаж"];
        }

        $(".calc-discount").html(parseInt(out).toString() + " руб.");
        $(".calc-price").html(parseInt(out_sale).toString() + " руб.");

        $(".calc-result").slideDown("fast");
    }

    var prices = null;

    function getPrice() {
        var url = "https://script.google.com/macros/s/AKfycbzOZSzEDOktCuzRer8ZN4xfVA75C-ALPtBSHBdsv8_WpsvqxTHx/exec";

        $.ajax({
            type: "POST",
            data: {},
            url: url,
            dataType: "json",
            success: function (data) {
                prices = data;
                $(".calc-description").html(data.price['Текст']);
                pricing();
            }
        });
        return false;
    }

    getPrice();

    function change() {
        var type = $("#calc-type-gate").val(),
            image_name = "";

        if (type === 'Филенка') {
            image_name = "fil-";
            $(".glass-calc").hide();
        } else if (type === 'Панорама') {
            $(".glass-calc").show();
        } else {
            $(".glass-calc").hide();
        }

        var color = $(".color-options").children("li").find('.active').attr("data-to-image");

        image_name = 'img/calc/img-calc/vorota-img/' + image_name + color + '.png';
        $(".replace-calc").attr("src", image_name);

        pricing();
    }

    // $(".filter-calculator").on("submit", function (e) {
    //     e.preventDefault();
    //
    //     pricing();
    // });

    $("#calc-height").on("change", function () {
        pricing();
    });

    $("#calc-width").on("change", function () {
        pricing();
    });

    $(".color-options").children("li").children("a").on("click", function (e) {
        e.preventDefault();

        $(".color-options").children("li").children("a").removeClass("active");
        $(this).addClass("active");

        change();
    });

    $(".dops-calc").children("li").children("a").on("click", function (e) {
        e.preventDefault();

        if ($(this).hasClass("active")) {
            if ($(this).attr("data-dop") === "window") {
                $(".glass-single").hide();
            } else if ($(this).attr("data-dop") === "door") {
                $(".door-calc").hide();
            }
            $(this).removeClass("active");
        } else {
            if ($(this).attr("data-dop") === "window") {
                $(".glass-single").show();
            } else if ($(this).attr("data-dop") === "door") {
                $(".door-calc").show();
            }
            $(this).addClass("active");
        }

        change();
    });

    $("#calc-type-gate").on("change", function () {
        if ($(this).val() === 'Панорама') {
            $(".calc-window-dop").hide().children("a").removeClass("active");
            $(".glass-single").hide();
        } else {
            $(".calc-window-dop").show();
        }

        change();
    });

    $("#calc-open-gate").on("change", function () {
        if ($(this).val() === 'Автоматика') {
            $(".calc-mech-dop").hide().children("a").removeClass("active");
        } else {
            $(".calc-mech-dop").show();
        }

        change();
    });
});


