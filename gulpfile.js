var path = require("path");
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var htmlmin = require("gulp-htmlmin");
var inject = require("gulp-inject");
var del = require("del");
var readYaml = require("read-yaml");
var series = require("stream-series");

gulp.task("clean", function() {
    return del(["dist/**/*", "!dist"]);
});

gulp.task("minify:images", function() {
    return gulp
        .src("jekyll-dist/assets/images/*")
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 5 }),
                    imagemin.svgo({
                        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                    })
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest("dist/assets/images"));
});

gulp.task("minify:js", function() {
    return gulp
        .src("jekyll-dist/*.js")
        .pipe(uglify())
        .pipe(
            rename(function(path) {
                path.basename += ".min";
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:css", function() {
    return gulp
        .src("jekyll-dist/*.css")
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(cleanCss())
        .pipe(
            rename(function(path) {
                path.basename += ".min";
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:html", function() {
    return gulp
        .src("jekyll-dist/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true, minifyJs: true, minifyCss: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("inject", function() {
    return new Promise(function(resolve, reject) {
        readYaml("_config.yml", function(err, data) {
            if (err) {
                return reject(err);
            }
            resolve(data.url);
        });
    })
        .then(function(url) {
            var vendorsStream = gulp.src(["dist/vendors.*"], { read: false });
            var siteStream = gulp.src(["dist/site.*"], { read: false });
            return gulp
                .src("dist/**/*.html")
                .pipe(
                    inject(series(vendorsStream, siteStream), {
                        relative: true,
                        addPrefix: url
                    })
                )
                .pipe(gulp.dest("dist"));
        })
        .catch(function(err) {
            throw new Error(err);
        });
});
