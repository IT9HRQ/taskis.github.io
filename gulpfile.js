
var gulp = require("gulp");
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
var modifyCssUrls = require("gulp-modify-css-urls");
var templateCache = require("gulp-angular-templatecache");
var runSequence = require("run-sequence");
var basename = require("path").basename;

gulp.task("default", function(done) {
    runSequence("style", "fonts", "html", "app", done);
});

gulp.task("style", function() {
    return gulp.src(["./app/style/uikit.css", "./app/style/**/*.css"])
        .pipe(concatCss("style.css"))
        .pipe(modifyCssUrls({
            modify: function (url, filePath) {
                return "../fonts/" + basename(url);
            }
        }))
        .pipe(gulp.dest("./css"));
});

gulp.task("fonts", function() {
    return gulp.src("./bower_components/**/fonts/*.{ttf,woff,eof,eot,svg,htc}")
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest("./fonts"));
});

gulp.task("html", function() {
    return gulp.src("./app/**/*.html")
        .pipe(templateCache({root: "app/", module: "app"}))
        .pipe(gulp.dest("app"));
});

gulp.task("app", function() {
    return gulp.src([
        "./bower_components/jquery/dist/jquery.min.js",
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./app/app.js",
        "./app/templates.js",
        "./app/**/*.js"
    ])
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./js"));
});

gulp.task("watch", function() {
    var files = [
        'app/**/*.js',
        'app/**/*.css',
        'app/**/*.scss'
    ];
    return gulp.watch(files, function() {
        gulp.start("default");
    });
});