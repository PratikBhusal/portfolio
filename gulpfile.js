"use strict";

// Plugins {{{
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');
const ghPages = require('gh-pages');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
// const plugins = require('gulp-load-plugins')({
//     rename: {
//         'gulp-clean-css': 'cleanCSS'
//     }
// });
// Plugins }}}

function deploy() {
    // Deploy dist folder to master branch
    return ghPages.publish('dist', {
        message: "See branch 'gh-pages' for detailed changes",
        branch: 'master'
    });
}

// Compile SCSS into CSS
function style() {
    // Find .scss File(s)
    return gulp.src('src/scss/main.scss')

    // Init Source maps
    .pipe(sourcemaps.init())

    // Pass .scss file(s) to sass compiler. Return any errors if they exist
    .pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError) )

    // Clean up the CSS
    .pipe(cleanCSS({level: 2}))

    // Create source maps
    .pipe( sourcemaps.write('.') )


    // Save compiled .css files to dist/style
    .pipe( gulp.dest('dist/style') )

    // Steam to web browser(s)
    .pipe(browserSync.stream());
}

function watch(done) {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        notify: false
    });
    gulp.watch('src/scss/**/*.scss', style);
    gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
    gulp.watch('dist/js/**/*.js').on('change', browserSync.reload);
    done();
}

exports.deploy = deploy;
exports.style = style;
exports.watch = watch;
exports.default = watch;
