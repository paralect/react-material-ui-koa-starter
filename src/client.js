import React, { useEffect } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

if (process.env.NODE_ENV === 'production') {
  // Options are optional and should be based on:
  // https://github.com/NekR/offline-plugin/blob/master/docs/options.md
  const options = {
    // my options
  };

  // eslint-disable-next-line global-require
  require('razzle-plugin-offline/lib/serviceWorker')(options);
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

hydrate(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
