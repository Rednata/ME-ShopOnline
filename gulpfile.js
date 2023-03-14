import gulp from 'gulp';
import browserSync from 'browser-sync';
// import cssImport from 'gulp-cssimport';
import gulpCssimport from 'gulp-cssimport';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import sourcemap from 'gulp-sourcemaps';
import webpackStream from 'webpack-stream';
import del from 'del';

// import webpack from 'webpack';

//  =====================================
//  dev = true -> режим development
//  dev = false -> режим production

const dev = false;
const prepros = true;

const sass = gulpSass(sassPkg);

const webpackConf = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'source-map' : false,
  entry: {
    index: './src/script/index.js',
    blog: './src/script/blog.js',
    article: './src/script/article.js',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [],
  },
};

if (!dev) {
  webpackConf.module.rules.push({
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  });
}

//  задачи

export const html = () => gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sourcemap.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.stream());
  }
  return gulp
      // .src('src/css/**/*.css')   если несколько css-Файлов
      .src('src/css/index.css') // если все мпортируется в один Css-файл
      .pipe(gulpCssimport({
        extentions: ['css']
      }))
      .pipe(gulp.dest('dist/style'))
      .pipe(browserSync.stream());
};

// export const css = () => gulp
//     .src('src/style/index.css')
//     .pipe(gulpCssimport({
//       extensions: ['css'],
//     }))
//     .pipe(gulp.dest('dist/style'))
//     .pipe(browserSync.stream());


export const js = () => gulp
    .src('./src/script/index.js')
    .pipe(webpackStream(webpackConf))
    .pipe(gulp.dest('dist/script'))
    .pipe(browserSync.stream());

export const blog = () => gulp
    .src('./src/script/blog.js')
    .pipe(webpackStream(webpackConf))
    .pipe(gulp.dest('dist/script'))
    .pipe(browserSync.stream());

export const article = () => gulp
    .src('./src/script/article.js')
    .pipe(webpackStream(webpackConf))
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
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch('./src/script/**/*.js', blog);
  gulp.watch('./src/script/**/*.js', article);
  gulp.watch([
    './src/assets/images/**/*',
    './src/assets/icons/**/*',
    './src/assets/fonts/**/*'], copy);
};

export const clear = () => del('dist/**/*', {forse: true});

//  запуск

export const base = gulp.parallel(html, style, js, blog, article, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);

