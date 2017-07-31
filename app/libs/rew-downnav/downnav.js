"use strict";

$(document).ready(function () {
    //top-bottom menu
    $(".nav-icon").click(function () {
        event.preventDefault();
        $(this).toggleClass("open");
        $(".nav-panel").slideToggle();
    });

    if (window.matchMedia("(max-width: 767px)").matches) {
        $(".smooth").click(function () {
            $(".nav-panel").slideToggle();
            $(".nav-icon").toggleClass("open");
        });

    }
})