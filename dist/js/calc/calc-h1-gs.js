$(document).ready(function () {
    'use strict';

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

        image_name = 'img/calc/img-calc-h1-gs/vorota-img/' + image_name + color + '.png';
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