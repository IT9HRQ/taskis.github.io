
var gulp = require("gulp");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var concatCss = require("gulp-concat-css");
var modifyCssUrls = require("gulp-modify-css-urls");
var templateCache = require("gulp-angular-templatecache");
var basename = require("path").basename;

gulp.task("default", function() {
    gulp.src(["./style/uikit.css", "./style/**/*.css"])
        .pipe(concatCss("style.css"))
        .pipe(modifyCssUrls({ modify: function (url, filePath) { return "../fonts/" + basename(url); } }))
        .pipe(gulp.dest("./css"));
    gulp.src("./bower_components/**/fonts/*.{ttf,woff,eof,eot,svg,htc}")
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest("./fonts"));
    gulp.src("./app/**/*.html")
        .pipe(templateCache({root: "app/", module: "app"}))
        .pipe(gulp.dest("app"));
    gulp.src(["./bower_components/**/*.min.js", "./app/**/*.js"])
        .pipe(concat("app.js"))
        .pipe(gulp.dest("./js"));
});