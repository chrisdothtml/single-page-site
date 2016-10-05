'use strict'

const config = require('./config.json')
const gulp = require('gulp')
const g = require('gulp-load-plugins')({camelize: true})
const u = require('./utils.js')

gulp.task('css', () => {
  const css = gulp.src('app/src/stylus/app.styl')
  const options = {
    rename: {
      extname: '.min.css'
    }
  }

  return css
    .pipe(g.stylus())
    .pipe(g.cssmin())
    .pipe(g.rename(options.rename))
    .pipe(gulp.dest('app/assets'))
})

gulp.task('vendor', () => {
  const paths = u.resolvePaths(config.vendor)
  const vendor = gulp.src(paths)
  const jsFilter = g.filter('**/*.js', {restore: true})
  const cssFilter = g.filter('**/*.css', {restore: true})

  return vendor
    // vendor js
    .pipe(jsFilter)
    .pipe(g.concat('vendor.min.js'))
    .pipe(g.uglify())
    .pipe(jsFilter.restore)
    // vendor css
    .pipe(cssFilter)
    .pipe(g.concat('vendor.min.css'))
    .pipe(g.cssmin())
    .pipe(cssFilter.restore)
    // put all in assets
    .pipe(gulp.dest('app/assets'))
})
