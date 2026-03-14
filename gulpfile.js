const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function handleError(err) {
    console.error('Gulp build error:', err.message);
    this.emit('end');
}

function CompileStyles(){
    return gulp.src('./src/styles/*.scss')
        .pipe(plumber({ errorHandler: handleError }))
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'));
}

function CompileScripts(){
    return gulp.src('./src/scripts/*.js')
        .pipe(gulp.dest('./dist/js'));
}

function watchFiles(){
    console.log('Watching changes in src/styles and src/scripts...');
    return gulp.watch(['./src/scripts/*.js', './src/styles/*.scss'], gulp.series(CompileStyles, CompileScripts));
}

exports.default = gulp.parallel(CompileStyles, CompileScripts);
exports.watch = gulp.series(exports.default, watchFiles);