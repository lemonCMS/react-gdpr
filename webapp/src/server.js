import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
// import PrettyError from 'pretty-error';
import http from 'http';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
// import httpProxy from 'http-proxy';
import Html from './Html';
import config from './config';
import CookieConsent from './Components/CookieConsent';
import getChunks, {waitChunks} from './utils/getChunks';

const chunksPath = path.join(__dirname, '..', 'static', 'dist', 'loadable-chunks.json');
process.on('unhandledRejection', error => console.error(error));
// const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

/*
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});
*/

// const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);

app
  .use(morgan('dev', {skip: req => req.originalUrl.indexOf('/ws') !== -1}))
  .use(compression())
  .use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
  .use('/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'manifest.json')));

app.use('/dist/service-worker.js', (req, res, next) => {
  res.setHeader('Service-Worker-Allowed', '/');
  return next();
});

app.use('/dist/dlls/:dllName.js', (req, res, next) => {
  fs.access(path.join(__dirname, '..', 'static', 'dist', 'dlls', `${req.params.dllName}.js`), fs.constants.R_OK, err => (err ? res.send(`console.log('No dll file found (${req.originalUrl})')`) : next()));
});

app.use(express.static(path.join(__dirname, '..', 'static')));

app.use((req, res, next) => {
  res.setHeader('X-Forwarded-For', req.ip);
  return next();
});

// server.on('upgrade', (req, socket, head) => {
// proxy.ws(req, socket, head);
// });

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
/*
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  const json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});
*/

app.use(async (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  function hydrate() {
    res.write('<!doctype html>');
    ReactDOM.renderToNodeStream(<Html assets={webpackIsomorphicTools.assets()} store={{}} />).pipe(res);
  }

  if (__DISABLE_SSR__) {
    return hydrate();
  }

  // Data fetched, state restored, lets render
  const modules = [];
  const component = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <CookieConsent />
    </Loadable.Capture>
  );
  const content = ReactDOM.renderToString(component);

  const bundles = getBundles(getChunks(), modules);
  const html = <Html assets={webpackIsomorphicTools.assets()} bundles={bundles} content={content} />;
  res.status(200).send(`<!doctype html>${ReactDOM.renderToString(html)}`);
});

(async () => {
  if (config.port) {
    try {
      await Loadable.preloadAll();
      await waitChunks(chunksPath);
    } catch (error) {
      console.log('Server preload error:', error);
    }

    server.listen(config.port, (err) => {
      if (err) {
        console.error(err);
      }
      console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
      console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
    });
  } else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
  }
})();
