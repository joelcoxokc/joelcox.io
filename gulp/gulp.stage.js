(function (Stage) {
    /* jshint camelcase:false */
    var gulp = require('gulp');
    var browserSync = require('browser-sync');
    var del = require('del');
    var glob = require('glob');
    var karma = require('karma').server;
    var merge = require('merge-stream');
    var paths = require('../gulp.config.json');
    var plato = require('plato');
    var plug = require('gulp-load-plugins')();
    var reload = browserSync.reload;

    var colors = plug.util.colors;
    var env = plug.util.env;
    var log = plug.util.log;

    var utils = require('./utils');

    Stage.vendor = {};

    /**
     * Lint the code, create coverage report, and a visualizer
     * @return {Stream}
     */
    Stage.analyze = function() {
        log('Analyzing source with JSHint, JSCS, and Plato');

        var jshint = utils.analyzejshint([].concat(paths.js, paths.specs, paths.nodejs));
        var jscs = utils.analyzejscs([].concat(paths.js, paths.nodejs));

        utils.startPlatoVisualizer();

        return merge(jshint, jscs);
    };

    /**
     * Create $templateCache from the html templates
     * @return {Stream}
     */
    Stage.templatecache = function() {

        log('Creating an AngularJS $templateCache');

        return gulp
            .src(paths.htmltemplates)
            // .pipe(plug.bytediff.start())
            .pipe(plug.minifyHtml({
                empty: true
            }))
            // .pipe(plug.bytediff.stop(utils.bytediffFormatter))
            .pipe(plug.angularTemplatecache('templates.js', {
                module: 'core',
                standalone: false,
                root: 'app/'
            }))
            .pipe(gulp.dest(paths.build));
    };

    /**
     * Minify and bundle the app's JavaScript
     * @required            analyze, templatecache
     * @return {Stream}
     */
    Stage.js = function() {
        log('Bundling, minifying, and copying the app\'s JavaScript');

        var source = [].concat(paths.js, paths.build + 'templates.js');
        return gulp
            .src(source)
            // .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
            .pipe(plug.concat('all.min.js'))
            .pipe(plug.ngAnnotate({
                add: true,
                single_quotes: true
            }))
            .pipe(plug.bytediff.start())
            .pipe(plug.uglify({
                mangle: true
            }))
            .pipe(plug.bytediff.stop(utils.bytediffFormatter))
            // .pipe(plug.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.build));
    };

    /**
     * Copy the Vendor JavaScript
     * @return {Stream}
     */
    Stage.vendor.js = function() {
        return utils.vendor.js();
    };

    /**
     * Minify and bundle the CSS
     * @return {Stream}
     */
    Stage.css = function() {
        log('Bundling, minifying, and copying the app\'s CSS');
        var styles = [].concat(paths.css, paths.styl.index);
        var filter = plug.filter('**/*.styl');
        return gulp.src(styles)
            .pipe(filter)
            .pipe(plug.stylus())
            .pipe(filter.restore())
            .pipe(plug.concat('all.min.css')) // Before bytediff or after
            .pipe(plug.autoprefixer('last 2 version', '> 5%'))
            .pipe(plug.bytediff.start())
            .pipe(plug.minifyCss({}))
            .pipe(plug.bytediff.stop(utils.bytediffFormatter))
            //        .pipe(plug.concat('all.min.css')) // Before bytediff or after
            .pipe(gulp.dest(paths.build + 'content'));
    };

    /**
     * Minify and bundle the Vendor CSS
     * @return {Stream}
     */
    Stage.vendor.css = function() {
        return utils.vendor.css();
    };

    /**
     * Copy fonts
     * @return {Stream}
     */
    Stage.fonts = function() {
        var dest = paths.build + 'fonts';
        log('Copying fonts');
        return gulp
            .src(paths.fonts)
            .pipe(gulp.dest(dest));
    };

    /**
     * Compress images
     * @return {Stream}
     */
    Stage.images = function() {

        var dest = paths.build + 'content/images';
        log('Compressing, caching, and copying images');
        return gulp
            .src(paths.images)
            .pipe(plug.imagemin({
                optimizationLevel: 3
            }))
            .pipe(gulp.dest('./build/content/images/'));
    };


    /**
     * Inject all the files into the new index.html
     * rev, but no map
     * @return {Stream}
     */
    Stage.inject = function() {

        log('Rev\'ing files and building index.html');

        var minified = paths.build + '**/*.min.*';
        var index = paths.client + 'index.html';
        var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
        var indexFilter = plug.filter(['index.html']);

        var stream = gulp
            // Write the revisioned files
            .src([].concat(minified, index)) // add all built min files and index.html
            .pipe(minFilter) // filter the stream to minified css and js
            .pipe(plug.rev()) // create files with rev's
            .pipe(gulp.dest(paths.build)) // write the rev files
            .pipe(minFilter.restore()) // remove filter, back to original stream

        // inject the files into index.html
        .pipe(indexFilter) // filter to index.html
        .pipe(inject('content/vendor.min.css', 'inject-vendor'))
            .pipe(inject('content/all.min.css'))
            .pipe(inject('vendor.min.js', 'inject-vendor'))
            .pipe(inject('all.min.js'))
            .pipe(gulp.dest(paths.build)) // write the rev files
        .pipe(indexFilter.restore()) // remove filter, back to original stream

        // replace the files referenced in index.html with the rev'd files
        .pipe(plug.revReplace()) // Substitute in new filenames
        .pipe(gulp.dest(paths.build)) // write the index.html file changes
        .pipe(plug.rev.manifest()) // create the manifest (must happen last or we screw up the injection)
        .pipe(gulp.dest(paths.build)); // write the manifest

        function inject(path, name) {
            var pathGlob = paths.build + path;
            var options = {
                ignorePath: paths.build.substring(1),
                read: false
            };
            if (name) {
                options.name = name;
            }
            return plug.inject(gulp.src(pathGlob), options);
        }
    };

    /**
     * Notify on build and or stage
     * rev, but no map
     * @return {Stream}
     */
    Stage.notify = function(event, msg) {
        log('Building the optimized app');

        return gulp.src('').pipe(plug.notify({
            onLast: true,
            message: 'Deployed code!'
        }));
    };

    /**
     * Watch files and build
     */
    Stage.watch = function() {

        log('Watching all files');

        var css = ['gulpfile.js'].concat(paths.css, paths.vendorcss);
        var images = ['gulpfile.js'].concat(paths.images);
        var js = ['gulpfile.js'].concat(paths.js);

        gulp
            .watch(js, ['scripts'])
            .on('change', logWatch);

        gulp
            .watch(css, ['styles'])
            .on('change', logWatch);

        gulp
            .watch(images, ['images'])
            .on('change', logWatch);

        function logWatch(event) {
            log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
        }
    };

})(module.exports);