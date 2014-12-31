var wiredep = require('wiredep'),
    gulp    = require('gulp'),
    $       = require('gulp-load-plugins')({lazy:false});

var paths = {
    root:      './client',
    html:      './client/**/*.html',
    bower:     './client/bower_components',
    index:     './client/index.html',
    styles:    './client/app/**/*.css',
    stylus:    './client/app/**/*index.styl',
    scripts:   ['./client/app/**/*.js','!./client/app/**/*.spec.js'],
    stylePath: './client/app/core/styles',
};

var tmp = {
  root:   './.tmp',
  styles: './.tmp/**/*.css',
  scripts: './.tmp/**/*.js'
};

gulp
    .task('default', $.sequence( 'build', 'server', 'watch'))
    .task('server', startServer)
    .task('watch', startWatch)

gulp
    .task('build', $.sequence('styles', 'inject', 'bower'))
    .task('styles', styles)
    .task('inject', startInject)
    .task('bower', bower)


function startServer(){

  require('./server');
  // $.nodemon('./server/index')
}

function startWatch(){

  $.livereload();
  $.livereload.listen();

  gulp.watch('./client/app/**/*.css', $.livereload.changed);
  gulp.watch('./client/app/**/*.styl', ['styles', $.livereload.changed]);
  gulp.watch('./client/app/**/*.js', $.livereload.changed);
  gulp.watch('./client/**/*.html', $.livereload.changed);
}

function styles(){

  return gulp.src( paths.stylus )
    .pipe( $.stylus() )
    .pipe( $.concat('app.css') )
    .pipe( gulp.dest(tmp.root) );
}

function startInject(){
  var target  = gulp.src( paths.index );
  var scripts = gulp.src( paths.scripts, {read:false} );
  var styles  = gulp.src( tmp.styles, {read:false} );

  return target
    .pipe( $.inject( scripts,  {relative:true}) )
    .pipe( $.inject( styles,  {relative:false, ignorePath:'.tmp'}) )
    .pipe( gulp.dest( paths.root ) );
}

function bower(){

  var wire = wiredep.stream;

  return gulp.src( paths.index )
    .pipe( wire({
      directory:paths.bower
    }))
    .pipe( gulp.dest( paths.root ) );
}