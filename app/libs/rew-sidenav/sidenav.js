

$(document).ready(function () {
    "use strict";
    //left-right menu
    $(".nav-icon").click(function () {
        event.preventDefault();
        $(this).toggleClass("open");
        $("main").toggleClass("open");
        $("nav").toggleClass("open");
        $("html, body").toggleClass("open-nav");
    });

    $("main").click(function () {
        if ($(this).hasClass("open")) {
            $(this).toggleClass("open");
            $(".nav-icon").toggleClass("open");
            $("nav").toggleClass("open");
            $("html,body").toggleClass("open-nav");
        }
    });

    $(window).on("load resize",function(){
        if (window.matchMedia("(max-width: 767px)").matches) {
            $("nav").prependTo("body");
            $(".nav-panel").prependTo("body");
        } else {
            $("nav").prependTo("header");
            $(".nav-panel").appendTo("nav .container .row");
        }
    });

    if (window.matchMedia("(max-width: 767px)").matches) {
        // $("nav").prependTo("body");
        // $(".nav-panel").prependTo("body");

        //left-right menu
        $(".smooth").click(function () {
            $("main").toggleClass("open");
            $("nav").toggleClass("open");
            $(".nav-icon").toggleClass("open");
            $("html,body").toggleClass("open-nav");
        });

    }
});