var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('build', () => {
  exec('rollup -c', function(err, stdout, stderr) {
    console.log(stderr);
  });
});

gulp.task('watch',function(){
  gulp.watch(['./src/*.js', 'rollup.js'], ['build']);
})

gulp.task('default', ['build', 'watch']);

