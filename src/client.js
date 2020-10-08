import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { register } from 'razzle-plugin-workbox/service-worker';

import App from './App';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const axe = require('@axe-core/react');

  axe(React, ReactDOM, 1000);
}

function Main() {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.hydrate(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

register();
