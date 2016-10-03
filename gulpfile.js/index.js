'use strict'

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
  const bowerGlobs = u.getBowerGlobs()
  const vendor = gulp.src(bowerGlobs)

  return vendor
    .pipe(g.concat('vendor.min.js'))
    .pipe(g.uglify())
    .pipe(gulp.dest('app/assets'))
})
