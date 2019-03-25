import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import htmlReplace from 'gulp-html-replace';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import htmlmin from 'gulp-htmlmin';
import dotenv from 'dotenv';
import shell from 'gulp-shell';

dotenv.config();

const { PORT, BUNDLER } = process.env;

import { FRAMEWORKS } from './src/common/frameworks';
import { createServer } from './src/server/server';

const checkEnv = envs => {
  envs.forEach(env => {
    if (!process.env[env])
      throw new Error(`env ${env} not set`)
  })
}

const taskNames = [];

const htmlTask = (name, title) => () => {
  return gulp.src(`./assets/gulp.html`)
    .pipe(htmlReplace({ title }))
    .pipe(rename({ basename: 'index' }))
    .pipe(htmlmin({ minifyCSS: true, collapseWhitespace: true }))
    .pipe(gulp.dest(`build/browserify/${name}`));
}

const buildTask = name => () => {
  let browserifyObj = browserify({
    entries: `./src/${name}/index.${name === 'angular' ? 't' : 'j'}s`,
    extensions: ['.js', '.css', '.ts', '.vue', '.pug']
  })
    .plugin('tsify', { noImplicitAny: true })
    .transform('browserify-css')
    .transform('babelify')
  if (name === 'vue') browserifyObj = browserifyObj.transform('vueify');
  return browserifyObj
    .bundle()
    .on('error', err => {
      console.log('kek', err.message);
      gulp.emit('end');
    })
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(`build/browserify/${name}`));
}

FRAMEWORKS.forEach(({ name, title }) => {
  const htmlTaskName = `html-${name}`, buildTaskName = `build-${name}`;
  taskNames.push(htmlTaskName, buildTaskName);
  gulp.task(htmlTaskName, htmlTask(name, title));
  gulp.task(buildTaskName, buildTask(name));
});

gulp.task('build', gulp.parallel(taskNames));

const watch = (path, names) => gulp.watch(path, gulp.parallel(names.map(name => `build-${name}`)));

gulp.task('watch', () => {
  checkEnv(['PORT']);
  const frameworkNames = FRAMEWORKS.map(i => i.name);
  frameworkNames.forEach(name => watch(`./src/${name}/*`, [name]));
  watch('./src/common/*', frameworkNames);
  createServer('production', PORT, () => console.info(`start watch on ${PORT} port`));
});

const getBuildCommand = () => {
  checkEnv(['BUNDLER']);
  switch (BUNDLER) {
    case 'parcel':
      return `parcel build ./src/**/*.html --no-source-maps -d build/parcel`;
    case 'webpack':
      return `webpack --config webpack.prod.js`;
    case 'browserify':
      return `gulp build`;
    default:
      return 'echo "env BUNDLER not set or unknown"'
  }
};

gulp.task('clear-build', shell.task('rmdir-cli build'));

gulp.task('build:env', shell.task(getBuildCommand()));