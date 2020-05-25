var gulp = require('gulp');

// Plugins 模块获取
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');

// 压缩 css
gulp.task('minify-css', function () {
	return gulp.src('./public/**/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('./public'));
});

// 压缩 html
gulp.task('minify-html', function () {
	return gulp.src('./public/**/*.html')
		.pipe(htmlclean())
		.pipe(htmlmin({
			removeComments: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true,
		}))
		.pipe(gulp.dest('./public'))
});

// 压缩 js 不压缩 min.js
gulp.task('minify-js', function () {
	return gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
		.pipe(uglify())
		.pipe(gulp.dest('./public'));
});

// 4.0 以前的写法 
//gulp.task('default', [
//   'minify-html', 'minify-css', 'minify-js'
//]);

// 4.0 以后的写法
// 执行 gulp 命令时执行的任务
gulp.task('default', gulp.parallel('minify-html', 'minify-css', 'minify-js'));

