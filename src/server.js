import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import shrinkRay from 'shrink-ray-current';
import { ServerStyleSheets } from '@material-ui/core/styles';

import App from './App';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#ff4400">
      <meta
        name="description"
        content="A starter for new projects with a power of React and Material components."
      >

      <title>Title</title>

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
      <link rel="manifest" href="/site.webmanifest">

      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        as="style"
        onload="this.onload=null;this.rel='stylesheet'"
      />
      <noscript>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
      </noscript>

      <style id="jss-server-side">${css}</style>
      ${
        assets.client.css
          ? `
            <link
              rel="preload"
              href="${assets.client.css}"
              as="style"
              onload="this.rel='stylesheet'"
            >
          `
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${html}</div>
    </body>
    </html>
  `;
}

function handleRender(req, res) {
  const context = {};
  const sheets = new ServerStyleSheets();

  // Render the component to a string.
  const html = renderToString(
    sheets.collect(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    )
  );

  // Grab the CSS from the sheets.
  const css = sheets.toString();

  // Send the rendered page back to the client.
  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send(renderFullPage(html, css));
  }
}

server
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(shrinkRay())
  .use((req, res, next) => {
    const isLocal =
      req.connection.localAddress === req.connection.remoteAddress;

    if (!isLocal && process.env.NODE_ENV !== 'development' && !req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }

    return void next();
  })
  .use(
    express.static(process.env.RAZZLE_PUBLIC_DIR, {
      etag: true, // Just being explicit about the default.
      lastModified: true, // Just being explicit about the default.
      setHeaders: (res, path) => {
        const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

        if (path.endsWith('.html')) {
          // All of the project's HTML files end in .html
          res.setHeader('Cache-Control', 'no-cache');
        } else if (hashRegExp.test(path)) {
          // If the RegExp matched, then we have a versioned URL.
          res.setHeader('Cache-Control', 'max-age=31536000');
        }
      },
    })
  )
  .get('/*', handleRender);

export default server;
