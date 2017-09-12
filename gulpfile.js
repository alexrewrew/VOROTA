// "use strict";

var gulp = require("gulp");  //gulp
var stylus = require("gulp-stylus"); //compile stylus
var browserSync = require("browser-sync"); //bower sync
var concat = require("gulp-concat"); //concat js
var uglify = require("gulp-uglify"); //min js
var cleanCSS = require("gulp-clean-css"); //min css
var htmlmin = require("gulp-html-minifier"); //min html
var autoprefixer = require("gulp-autoprefixer"); //autoprefixer
var csscomb = require("gulp-csscomb"); //css combine
var rimraf = require("rimraf"); //clean dist
var imagemin = require("gulp-imagemin"); //min image
var pug = require("gulp-pug"); //compile pug
var notify = require("gulp-notify"); //notify
var runSequence = require("run-sequence");

//browser sync
gulp.task("browserSync", function () {
    browserSync({
        server: {
            baseDir: "app"
        }
    });
});

//stylus compilation
gulp.task("stylus", function () {
    return gulp.src("app/stylus/style.styl")
        .pipe(stylus({"include css": true}).on("error", notify.onError(function (error) {
            return "An error occurred while compiling stylus.\nLook in the console for details.\n" + error;
        })))
        .pipe(autoprefixer({
            browsers: ["last 10 versions", "ie 8", "ie 9", "ie 10"],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//pug compilation
gulp.task("pug", function buildHTML() {
    return gulp.src("app/pages/*.pug")
        .pipe(pug({pretty: true}).on("error", notify.onError(function (error) {
            return "An error occurred while compiling jade.\nLook in the console for details.\n" + error;
        })))
        .pipe(gulp.dest("app/"));
});

//js concat
gulp.task("scripts", function () {
    return gulp.src([
            "app/libs/jquery/dist/jquery.js",
            "app/libs/jquery-ui/jquery-ui.js",
            // "app/libs/tether/dist/js/tether.js",
            // "app/libs/bootstrap/dist/js/bootstrap.js",
            // "app/libs/bootstrap3/dist/js/bootstrap.js",
            "app/libs/chosen/chosen.jquery.js",
            "app/libs/chosen-image/chosenImage/chosenImage.jquery.js",
            // "app/libs/iCheck/icheck.js",
            "app/libs/slick-carousel/slick/slick.js",
            // "app/libs/owl.carousel/dist/owl.carousel.js",
            // "app/libs/remodal/dist/remodal.js",
            "app/libs/modaal/dist/js/modaal.js",
            // "app/libs/magnific-popup/dist/jquery.magnific-popup.js",
            // "app/libs/wow/dist/wow.js",
            // "app/libs/animsition/dist/js/animsition.js",
            // "app/libs/rew-downnav/downnav.js",
            // "app/libs/rew-sidenav/sidenav.js",
            "app/js/scripts/scripts.js"
        ])
        .pipe(concat("main.js"))
        .pipe(gulp.dest("app/js"));
});

gulp.task("calculator", function () {
    return gulp.src(['app/js/calc/*'])
        .pipe(gulp.dest("dist/js/calc"));
});

//--------BUILD

//clean dest
gulp.task("clean", function (cb) {
    rimraf("./dist/*", cb);
});

//js minify
gulp.task("compress", function () {
    return gulp.src("app/js/main.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

// css minify
gulp.task("minify-css", function () {
    return gulp.src("app/css/style.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"));
});

//html minify
gulp.task("minify-html", function () {
    gulp.src("app/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
});

//img minify
gulp.task("imagemin", function () {
    gulp.src("app/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

//copy fonts
gulp.task("fonts", function () {
    return gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

//copy video
gulp.task("video", function () {
    return gulp.src("app/video/**/*")
        .pipe(gulp.dest("dist/video"));
});

//copy php
gulp.task("php", function () {
    return gulp.src("app/php/**/*")
        .pipe(gulp.dest("dist/php"));
});
//copy audio
gulp.task("audio", function () {
    return gulp.src("app/audio/**/*")
        .pipe(gulp.dest("dist/audio"));
});

//build
gulp.task("develope", ["fonts", "video", "imagemin", "minify-css", "compress", "minify-html", 'calculator'], function () {
});

gulp.task("build", function(callback) {
    runSequence("clean",
        "develope",
        callback);
});

//watch
gulp.task("watch", ["scripts", "pug", "browserSync", "stylus"], function () { //запуск browser-sync та sass відслідковувачів
    gulp.watch("app/stylus/**/*.styl", ["stylus"]); //пошук scss файлів
    gulp.watch("app/pages/**/*.pug", ["pug"]); //пошук html файлів
    gulp.watch(["app/js/scripts/scripts.js"], ["scripts"]); //пошук html файлів
    gulp.watch("app/js/calc/*", browserSync.reload); //пошук html файлів
    gulp.watch("app/*.html", browserSync.reload); //пошук html файлів
    gulp.watch("app/js/*.js", browserSync.reload); //пошук js файлів
});