// Gulp.js configuration
var
// modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    pug = require('gulp-pug2'),
    spawn = require('child_process').spawn,
    node,

    // folders
    folder = {
        src: 'src/',
        build: 'build/'
    };

// image processing
gulp.task('images', function() {
    var out = folder.build + 'assets/images/';
    return gulp.src(folder.src + 'assets/images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(out));
});

// font processing
gulp.task('fonts', function() {
    var out = folder.build + 'assets/fonts/';
    return gulp.src(folder.src + 'assets/fonts/**/*')
        .pipe(newer(out))
        .pipe(gulp.dest(out));
})

// script processing
gulp.task('scripts', function() {
    var out = folder.build + 'assets/scripts/';
    return gulp.src(folder.src + 'assets/scripts/**/*')
        .pipe(newer(out))
        .pipe(gulp.dest(out));
})

// style processing
gulp.task('styles', function() {
    var out = folder.build + 'assets/styles/';
    return gulp.src(folder.src + 'assets/styles/**/*')
        .pipe(newer(out))
        .pipe(gulp.dest(out));
})

// view processing
gulp.task('views', function() {
    var
        out = folder.build + 'pages/',
        page = gulp.src(folder.src + 'pages/**.pug')
        .pipe(newer(out));

    return page.pipe(gulp.dest(out));
})

/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function() {
    if (node) node.kill()
    node = spawn('node', [folder.src + 'index.js'], { stdio: 'inherit' })
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
})

// watch for changes
gulp.task('watch', function() {

    // views changes
    gulp.watch(folder.src + 'pages/**/*', ['views']);

    // fonts changes
    gulp.watch(folder.src + 'assets/fonts/**/*', ['fonts']);

    // images changes
    gulp.watch(folder.src + 'assets/images/**/*', ['images']);

    // script changes
    gulp.watch(folder.src + 'assets/scripts/**/*', ['scripts']);

    // sytles changes
    gulp.watch(folder.src + 'assets/styles/**/*', ['styles']);

    gulp.watch(folder.src + 'index.js', ['server']);

});

// run all tasks
gulp.task('run', ['views', 'images', 'fonts', 'scripts', 'styles', 'server']);

// default task
gulp.task('default', ['run', 'watch']);