import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import CookieConsent from './Components/CookieConsent';

const render = (Component) => {
  ReactDom.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('reactContent')
  );
};

render(CookieConsent);

if (module.hot) {
  module.hot.accept('./Components/CookieConsent', () => {
    render(require('./Components/CookieConsent').default);
  });
}
