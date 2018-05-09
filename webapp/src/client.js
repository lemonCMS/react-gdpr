import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import CookieConsent from './CookieConsent';

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('reactContent'),
  );
};

render(CookieConsent);

if (module.hot) {
  module.hot.accept('./CookieConsent', () => {
    render(require('./CookieConsent').default);
  });
}
