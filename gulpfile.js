/* jshint camelcase:false */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var glob = require('glob');
var karma = require('karma').server;
var merge = require('merge-stream');
var paths = require('./gulp.config.json');
var plato = require('plato');
var plug = require('gulp-load-plugins')();
var reload = browserSync.reload;

var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;
var port = process.env.PORT || 9000;


var utils = require('./gulp/utils');
var stage = require('./gulp/gulp.stage');
var dev = require('./gulp/gulp.dev');



/**
 * Helper tasks
 *
 * @task    help        List the available gulp tasks
 * @task    clean       Remove all files from the build folder
 *                      One way to run clean before all tasks is to run
 *                      from the cmd line: gulp clean && gulp build
 */
gulp
    .task('help', plug.taskListing)
    .task('clean', function(cb) {
        log('Cleaning: ' + plug.util.colors.blue(paths.build));

        var delPaths = [].concat(paths.build, paths.report, paths.tmp.root);
        del(delPaths, cb);
    });

/**
 * scripts
 *
 * @task    js             Minify and bundle the app's JavaScript
 * @task    vendor:js      Copy the Vendor JavaScript
 * @task    analyze        Lint the code, create coverage report, and a visualizer
 * @task    templatecache  Create $templateCache from the html templates
 *
 * @return {Stream}
 */
gulp
    .task('scripts',
        plug.sequence(
            'templatecache',
            'analyze',
            'vendor:js',
            'js'
        ))
    .task('templatecache', stage.templatecache)
    .task('analyze', stage.analyze)
    .task('vendor:js', stage.vendor.js)
    .task('js', stage.js)

/**
 * styles
 *
 * @task    css             Minify and bundle the CSS
 * @task    vendor:css      Minify and bundle the Vendor CSS
 *
 * @return {Stream}
 */
gulp
    .task('styles',
        plug.sequence(
            'css',
            'vendor:css'
        ))
    .task('css', stage.css)
    .task('vendor:css', stage.vendor.css)

/**
 * Assets copyand compress images and fonts
 *
 * @task    fonts            copy fonts
 * @task    fonts            compress fonts
 *
 * @return {Stream}
 */
gulp
    .task('assets',
        ['fonts','images'])
    .task('fonts', stage.fonts)
    .task('images', stage.images)

/**
 * Stage the optimized app
 *
 * @task    stage:scripts     @scripts
 * @task    stage:styles      @styles
 * @task    stage:assets      @assets
 * @task    stage:inject      Inject all the files into the new index.html; re, but no map
 * @task    stage:notify      Notify on build
 * @task    stage:watch       Watch files and build
 *
 * @return {Stream}
 */
gulp
    .task('stage',
        plug.sequence(
            'stage:scripts',
            'stage:styles',
            'stage:inject',
            'stage:assets',
            'stage:notify'
        ))
    .task('stage:scripts', ['scripts'])
    .task('stage:styles',  ['styles'])
    .task('stage:assets',  ['assets'])
    .task('stage:inject',  stage.inject)
    .task('stage:notify',  stage.notify)
    .task('stage:watch',   stage.watch)

/**
 * Build
 * Backwards compatible call to make stage and build equivalent
 * @return {Stream}
 */
gulp.task('build', ['stage'])

/**
 * dev:scripts
 *
 * @task dev:js
 * @task dev:templates
 * @task dev:vendor:js
 *
 */
gulp
    .task('dev:scripts',
        [
            'dev:js',
            'dev:templates',
            'dev:vendor:js'
        ]
    )
    .task('dev:js', ['dev:analyze'], dev.js)
    .task('dev:analyze', dev.analyze)
    .task('dev:templates', dev.templates)
    .task('dev:vendor:js', dev.vendor.js)

/**
 * dev:styles
 *
 * @task dev:css
 * @task dev:styl
 * @task dev:vendor.css
 */
gulp
    .task('dev:styles',
        [
            'dev:css',
            'dev:styl',
            'dev:vendor:css'
        ]
    )
    .task('dev:css', dev.css)
    .task('dev:styl', dev.styl)
    .task('dev:vendor:css', dev.vendor.css)

/**
 * dev:styles
 *
 * @task dev:images
 * @task dev:fonts
 */
gulp
    .task('dev:assets',
        [
            'dev:images',
            'dev:fonts'
        ])
    .task('dev:images', dev.images)
    .task('dev:fonts', dev.fonts);


gulp
    .task('dev',
        plug.sequence(
            'clean',
            'dev:scripts',
            'dev:styles',
            'dev:assets',
            'dev:inject',
            'serve-dev-debug',
            'dev:watch'
        ))
    .task('dev:inject', dev.inject)
    .task('dev:watch', dev.watch)

/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', function(done) {
    utils.startTests(true /*singleRun*/ , done);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function(done) {
    utils.startTests(false /*singleRun*/ , done);
});

/**
 * serve the dev environment, with debug,
 * and with node inspector
 */
gulp.task('serve-dev-debug', function() {
    utils.serve({
        mode: 'dev',
        debug: '--debug'
    });
});

/**
 * serve the dev environment, with debug-brk,
 * and with node inspector
 */
gulp.task('serve-dev-debug-brk', function() {
    utils.serve({
        mode: 'dev',
        debug: '--debug-brk'
    });
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev', function() {
    utils.serve({
        mode: 'dev'
    });
});

/**
 * serve the build environment
 */
gulp.task('serve-build', function() {
    utils.serve({
        mode: 'build'
    });
});

/**
 * Backwards compatible call to make stage and build equivalent
 */
gulp.task('serve-stage', ['serve-build'], function() {});
