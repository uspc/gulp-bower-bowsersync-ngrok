// REquired

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browsersync = require('browser-sync');
var sass = require('gulp-ruby-sass');
var reload =browsersync.reload;
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ngrok = require('ngrok');
var bower = require('gulp-bower');

//minimize js file
gulp.task('scripts',function()
{
    console.log("Test working code");
    gulp.src(['src/js/**/*.js','!src/js/**/*.min.js'])
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(reload({stream:true}));


});

//convert sass to css
gulp.task('sass',function(){
         sass('src/scss/main.scss', { style: 'expanded' })
             .pipe(autoprefixer('last 2 version'))
             .pipe(rename({basename:'mystyle',extname:'.css',suffix:'.min'}))
             .pipe(cssnano())
             .pipe(gulp.dest('public/css'))
             .pipe(reload({stream:true}));
});

//concat all dependent js file into one single file
gulp.task('conct',function(){
    gulp.src(['bower_components/**/*.js','!bower_components/**/*.min.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js/'))
});

//move html file to destination
gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('public'))
        .pipe(reload({stream:true}));
});

// browser-sync stand alone
//gulp.task('browser-sync',function(){
//    browsersync({
//        server:{
//            baseDir: "./public/"
//        }
//    });
//});

// start local server with public pipe for external url
gulp.task('browser-sync',function() {
    browsersync({
        server: {baseDir: "./public/"}
    }, function (err, bs) {
        ngrok.connect(bs.options.get('port'), function (err, url) {
            // https://757c1652.ngrok.com -> 127.0.0.1:8080
            console.log('connect using public url')
            console.log(url);
        });
    });
});

// bower all the dependent modules
gulp.task('bower', function() {
    return bower();
});

// watch for change to source file and invoke corresponding tasks
gulp.task('watch',function()
    {
        gulp.watch('src/js/**/*.js',['scripts']);
        gulp.watch('src/*.html',['html']);
        gulp.watch('./src/**/*.scss',['sass']);
    });

//Default
gulp.task('default',['bower','scripts','html','sass','conct','watch','browser-sync']);