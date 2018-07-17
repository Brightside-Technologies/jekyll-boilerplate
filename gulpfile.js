var path = require("path");
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var htmlmin = require("gulp-htmlmin");
var inject = require("gulp-inject");
var responsive = require("gulp-responsive");
var cachebust = require("gulp-buster");
var del = require("del");
var readYaml = require("read-yaml");
var series = require("stream-series");

var cacheBustingOptions = {
    fileName: "cache-bust.json",
    length: 5,
    relativePath: "jekyll-dist"
};

gulp.task("clean:prebuild", function() {
    return del(["dist/**/*", "!dist"]);
});

gulp.task("clean:postbuild", function() {
    var filesToClean = ["dist/*.min.{css,js}", "dist/*.json"];
    return del(filesToClean);
});

gulp.task("minify:images", function() {
    return gulp
        .src("jekyll-dist/assets/**/*")
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
        .pipe(gulp.dest("dist/assets"));
});

gulp.task("minify:js", function() {
    var hashes = require("./" + path.join("dist", cacheBustingOptions.fileName));
    return gulp
        .src("jekyll-dist/*.js")
        .pipe(uglify())
        .pipe(
            rename(function(path) {
                path.basename = path.basename + ".min" + "." + hashes[path.basename + path.extname];
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:css", function() {
    var hashes = require("./" + path.join("dist", cacheBustingOptions.fileName));
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
                path.basename = path.basename + ".min" + "." + hashes[path.basename + path.extname];
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:html", function() {
    return gulp
        .src("jekyll-dist/*.html")
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
                .src("dist/*.html")
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

gulp.task("responsive-images:clean", function() {
    return del(["src/jekyll/assets/images/**/*.responsive.*"]);
});

gulp.task("responsive-images", ["responsive-images:clean"], function() {
    return gulp
        .src("src/jekyll/assets/images/*.{jpg,png}")
        .pipe(
            responsive(
                {
                    // Convert all images to JPEG format
                    "*": [
                        {
                            // image-medium.jpg is 375 pixels wide
                            width: 300,
                            rename: {
                                suffix: "@1x.responsive",
                                extname: ".jpg"
                            }
                        },
                        {
                            // image-large.jpg is 480 pixels wide
                            width: 300 * 2,
                            rename: {
                                suffix: "@2x.responsive",
                                extname: ".jpg"
                            }
                        },
                        {
                            // image-extralarge.jpg is 768 pixels wide
                            width: 300 * 3,
                            rename: {
                                suffix: "@3x.responsive",
                                extname: ".jpg"
                            },
                            skipOnEnlargement: true
                        }
                    ]
                },
                {
                    // Global configuration for all images
                    // The output quality for JPEG, WebP and TIFF output formats
                    quality: 80,
                    // Use progressive (interlace) scan for JPEG and PNG output
                    progressive: true,
                    // Strip all metadata
                    withMetadata: false,
                    // Do not emit the error when image is enlarged.
                    errorOnEnlargement: false
                }
            )
        )
        .pipe(gulp.dest("src/jekyll/assets/images"));
});

gulp.task("copy:assets", function() {
    return gulp.src("jekyll-dist/assets/**/*").pipe(gulp.dest("dist/assets"));
});

gulp.task("copy:root-files", function() {
    var rootFiles = ["jekyll-dist/sitemap.xml", "jekyll-dist/robots.txt"];
    return gulp.src(rootFiles).pipe(gulp.dest("dist"));
});

gulp.task("get-hash", function() {
    return gulp
        .src("jekyll-dist/*.{css,js}")
        .pipe(cachebust(cacheBustingOptions))
        .pipe(gulp.dest("dist"));
});
