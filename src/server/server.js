import express from 'express';
import path from 'path';
import { FRAMEWORKS } from '../common/frameworks';

const BUILD_PATH = '../../build';

export const createServer = (mode, port, onListen) => {
  const app = express()
    .use((req, res, next) => req.url.endsWith('.html') ? res.sendStatus(404) : next());

  const useFramework = framework => {
    const config = require('../../webpack.dev')(framework);
    const compiler = require('webpack')(config);
    const webpackDev = require("webpack-dev-middleware");
    const webpackHot = require("webpack-hot-middleware");
    app.use(framework.route, webpackDev(compiler));
    app.use(webpackHot(compiler, { noInfo: true, path: `${framework.route}/__webpack_hmr` }));
  }

  if (mode === 'production')
    app.use('/', express.static(path.resolve(__dirname, BUILD_PATH)));
  else
    FRAMEWORKS.forEach(useFramework);

  app
    .all('*', (req, res) => res.sendStatus(404))
    .listen(port, onListen);
}
