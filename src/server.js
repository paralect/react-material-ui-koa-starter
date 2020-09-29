import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { ServerStyleSheets } from '@material-ui/core/styles';

import App from './App';

// eslint-disable-next-line import/no-dynamic-require
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html lang="">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="utf-8" />
      <title>Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style id="jss-server-side">${css}</style>
      ${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''
      }
      ${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
    </head>
    <body>
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
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', handleRender);

export default server;
