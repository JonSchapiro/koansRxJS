'use strict';
var
    gulp  = require('gulp'),
    mocha = require('gulp-mocha')
;

gulp.task('default', function () {
    return gulp.src(
      [
        'koans/Answers/lesson1-observablestreams.js',
        'koans/Answers/lesson2-ComposableObservations.js',
        'koans/Answers/lesson3-Time.js',
        'koans/Answers/lesson6-AdvancedStreams.js'
      ])
      .pipe(mocha({
        reporter: 'List'
      }))
    ;
});
