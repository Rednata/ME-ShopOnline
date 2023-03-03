import gulp from 'gulp';
import browserSync from 'browser-sync';
// import cssImport from 'gulp-cssimport';
import gulpCssimport from 'gulp-cssimport';
import del from 'del';


//  задачи

export const html = () => gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const css = () => gulp
    .src('src/style/index.css')
    .pipe(gulpCssimport({
      extensions: ['css'],
    }))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());

export const js = () => gulp
    .src('src/script/script.js')
    .pipe(gulp.dest('dist/script'))
    .pipe(browserSync.stream());

export const copy = () => gulp
    .src([
      'src/assets/fonts/**/*',
      'src/assets/images/**/*',
      'src/assets/icons/**/*',
    ], {
      base: 'src',
    })
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({
      once: true,
    }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
    // tunnel: true,
    server: {
      baseDir: 'dist',
    },
  });

  gulp.watch('./src/**/*.html', html);
  gulp.watch('./src/style/**/*.css', css);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch([
    './src/assets/images/**/*',
    './src/assets/icons/**/*',
    './src/assets/fonts/**/*'], copy);
};

export const clear = () => del('dist/**/*', {forse: true});
//  запуск

export const base = gulp.parallel(html, css, js, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);

