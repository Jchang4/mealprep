const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const nodemon = require('nodemon');

const webpackConfig = require('./webpack.config')

function onBuild(done) {
    return function(err, stats) {
      if(err) {
        console.log('Error', err);
      }
      else {
        console.log(stats.toString());
      }
  
      if (done) {
        done();
      }
    }
  }

gulp.task('build', done => {
  webpack(webpackConfig).run(onBuild(done));
});

gulp.task('backend-watch', () => {
    webpack(webpackConfig).watch(100, function(err, stats) {
      onBuild()(err, stats);
      nodemon.restart();
    });
});

gulp.task('dev', ['backend-watch'], () => {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'dist/server.js'),
        ignore: ['*'],
        watch: ['src/'],
        ext: 'noop'
    }).on('restart', function() {
        console.log('Restarted!');
    });
});

