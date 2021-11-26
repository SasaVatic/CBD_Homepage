const { src, dest, watch, series } = require('gulp');
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function html() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

function fonts() {
    return src('src/assets/fonts/**/*.ttf')
        .pipe(dest('dist/assets/fonts'));
}

function css() {
    return src('src/assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/css'))
        .pipe(browserSync.stream());
}

function js() {
    return src('src/assets/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('index.min.js'))
        .pipe(uglify({ mangle: { toplevel: true } }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/js'));
}

function img() {
    return src('src/assets/img/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/assets/img'));
}

function watchTask() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
    watch('src/*.html', html).on('change', browserSync.reload);
    watch('src/assets/fonts/**/*.ttf', fonts)
    watch('src/assets/scss/**/*.scss', css);
    watch('src/assets/js/**/*.js', js).on('change', browserSync.reload);
    watch('src/assets/img/**/*', img);
}

exports.default = series(
    html,
    fonts,
    css,
    js,
    img,
    watchTask
);