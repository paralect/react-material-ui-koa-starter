import React, { useEffect } from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

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
