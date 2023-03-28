import gulp from 'gulp';
import browserSync from 'browser-sync';
// import cssImport from 'gulp-cssimport';
import gulpCssimport from 'gulp-cssimport';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import sourcemap from 'gulp-sourcemaps';
import webpackStream from 'webpack-stream';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';
import { stream as critical } from 'critical';
import gulpif from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';

// import terser from 'gulp-terser';
// import concat from 'gulp-concat';
// import webpack from 'webpack';

//  =====================================
//  dev = true -> режим development
//  dev = false -> режим production

const prepros = true;
let dev = false;

const sass = gulpSass(sassPkg);

const webpackConf = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'source-map' : false,
  entry: {
    index: './src/script/index.js',
    blog: './src/script/blog.js',
    article: './src/script/article.js',
    card: './src/script/card.js',
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
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(gulpif(dev, sourcemap.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(cleanCSS({
        //   2: {
        //     specialComments: 0,
        //   },
        // }))
        .pipe(gulpif(dev, sourcemap.write('../maps')))
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.stream());
  }
  return gulp
      // .src('src/css/**/*.css')   если несколько css-Файлов
      .src('src/css/index.css') // если все мпортируется в один Css-файл
      .pipe(gulpif(dev, sourcemap.init()))
      .pipe(gulpCssimport({
        extentions: ['css'],
      }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({
        2: {
          specialComments: 0,
        },
      }))
      .pipe(gulpif(dev, sourcemap.write('../maps')))
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


//  ================== JS =====================
//  ================== JS =====================

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

export const card = () => gulp
    .src('./src/script/card.js')
    .pipe(webpackStream(webpackConf))
    .pipe(gulp.dest('dist/script'))
    .pipe(browserSync.stream());

export const img = () => gulp
    .src('src/assets/**/*.{jpg,jpeg,png,svg}')
    .pipe(gulpif(!dev, gulpImg({
      optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
      pngquant: ['--speed=1', '--force', 256],
      zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
      jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
      mozjpeg: ['-optimize', '-progressive'],
      gifsicle: ['--optimize'],
      svgo: true,
    })))
    .pipe(gulp.dest('dist/assets'));

export const webp = () => gulp
    .src('src/assets/**/*.{jpg,jpeg,png}')
    .pipe(gulpWebp({
      quality: 60,
    }))
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream({
      once: true,
    }));

export const avif = () => gulp
    .src('src/assets/**/*.{jpg,jpeg,png}')
    .pipe(gulpAvif({
      quality: 60,
    }))
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream({
      once: true,
    }));

export const critCSS = () => gulp
  .src('dist/*.html')
  .pipe(critical({
    base: 'dist/',
    inline: true,
    css: ['dist/style/index.css']
  }))
  .on('error', err => {
    console.error(err.message)
  })
    .pipe(gulp.dest('dist'));

export const copy = () => gulp
    .src('src/assets/fonts/**/*', {
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
  gulp.watch('./src/assets/images/**/*.{jpg, jpeg, png, svg}', img);
  gulp.watch('./src/script/**/*.js', js);
  gulp.watch('./src/script/**/*.js', blog);
  gulp.watch('./src/script/**/*.js', article);
  gulp.watch('./src/script/**/*.js', card);
  gulp.watch('./src/assets/fonts/**/*', copy);
};

export const clear = () => del('dist/**/*', {forse: true});

//  запуск

export const develop = async() => {
  dev = true;
};

export const base = gulp.parallel(html, style, js, blog, article, card, avif, webp, img, copy);

export const build = gulp.series(clear, base, critCSS);

export default gulp.series(develop, base, server);

