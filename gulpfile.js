"use strict";

// Plugins {{{
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({
    rename: {
        'gulp-clean-css': 'cleanCSS'
    }
});
const extendedPlugins = require('gulp-load-plugins')({
    overridePattern: false,
    pattern: ['gh-pages', 'del', 'browser-sync'],
});
// Plugins }}}

// Clean built files
function clean() {
    return extendedPlugins.del(["dist/style", "dist/scripts"]);
}

function publish_site() {
    // Deploy dist folder to master branch
    return extendedPlugins.ghPages.publish('dist', {
        message: "See branch 'gh-pages' for detailed changes",
        branch: 'master'
    });
}

// Compile SCSS into CSS
function css() {
    // Find .scss File(s)
    return gulp.src('src/scss/main.scss')

    // Init Source maps
    .pipe(plugins.sourcemaps.init())

    // Pass .scss file(s) to sass compiler. Return any errors if they exist
    // Use 'compressed'/'expanded' as need be
    .pipe( plugins.sass({outputStyle: 'compressed'}).on(
        'error', plugins.sass.logError)
    )

    // Clean up the CSS
    .pipe( plugins.cleanCSS({level: 2}) )

    // Create source maps
    .pipe( plugins.sourcemaps.write('.') )


    // Save compiled .css files to dist/style
    .pipe( gulp.dest('dist/style') )

    // Steam to web browser(s)
    .pipe( extendedPlugins.browserSync.stream() );
}

// Compress javascript
function js() {
    return gulp

    // Find .js File(s)
    .src('src/scripts/**/*.js')

    // Concatenate the files
    .pipe(plugins.concat('scripts.js'))

    // Compress
    // .pipe( plugins.uglify() )

    // Save compiled .css files to dist/scripts
    .pipe(gulp.dest('dist/scripts'));
}

function watch() {
    extendedPlugins.browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        // port: 6411,
        ghostMode: false,
        notify: false
    });
    gulp.watch('src/scss/**/*.scss', css);
    gulp.watch('src/scripts/**/*.js', js);
    gulp.watch('dist/**/*.html').on('change', extendedPlugins.browserSync.reload);
    gulp.watch('dist/**/*.js').on('change', extendedPlugins.browserSync.reload);
}

exports.clean = clean;
exports.build = gulp.series(clean, gulp.parallel(css, js));
exports.deploy = gulp.series(exports.build, publish_site);
exports.watch = gulp.series(exports.build, watch);
exports.default = exports.watch
