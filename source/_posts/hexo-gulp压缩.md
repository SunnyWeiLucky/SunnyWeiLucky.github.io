---
title: hexo-gulp压缩
categories: [Tool,hexo]
tags: gulp
abbrlink: 2127593710
date: 2020-05-25 10:21:08
---

### 插件安装

~~~
#全局安装
npm install gulp -g
#站点目录安装
npm install gulp-htmlclean gulp-htmlmin gulp-minify-css gulp-uglify --save

~~~

在这里说明一下，使用该工具可以压缩 HTML、CSS、JavaScript 文件，但我并没有压缩 JavaScript 文件，因为有很大的概率会报错，实际也并不需要压缩，因为大部分 JavaScript 都已压缩过。

如果你也考虑不压缩 JavaScript 文件，可以选择不安装 `gulp-uglify`。

### gulpfile.js

在站点文件夹的根目录下，新建一个文件。命名为gulpfile.js

~~~
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
// gulp.task('default', [
  //   'minify-html', 'minify-css', 'minify-js'
// ]);

// 4.0 以后的写法
// 执行 gulp 命令时执行的任务
gulp.task('default', gulp.parallel('minify-html', 'minify-css', 'minify-js'));

~~~

`如果不压缩 JavaScript 文件，则将上述代码中有关 `minify-js` 的代码删除即可`



### 运行结果

~~~
[10:24:57] Starting 'default'...
[10:24:57] Starting 'minify-html'...
[10:24:57] Starting 'minify-css'...
[10:24:57] Starting 'minify-js'...
[10:25:05] Finished 'minify-css' after 8.3 s
[10:25:05] Finished 'minify-js' after 8.49 s
[10:25:09] Finished 'minify-html' after 12 s
[10:25:09] Finished 'default' after 12 s

~~~

