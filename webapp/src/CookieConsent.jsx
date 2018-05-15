import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import CookiesJS from 'universal-cookie';
import CookieBar from './Components/CookieBar';

class CookieConsent extends React.Component {
  cookies = null;

  constructor() {
    super();
    this.toggleCookieSettings = this.toggleCookieSettings.bind(this);
    this.saveCookieConsent = this.saveCookieConsent.bind(this);
    this.listener = this.listener.bind(this);
    this.cookieConsent = this.cookieConsent.bind(this);
    this.state = {
      showCookieSettings: false,
      showCookieBar: true,
      openedByHash: false,
      level: 1
    };
    if (typeof window !== 'undefined') {
      this.cookies = new CookiesJS();
    }
  }

  static childContextTypes = {
    cookieConsent: PropTypes.func.isRequired,
    toggleCookieSettings: PropTypes.func.isRequired,
    saveCookieConsent: PropTypes.func.isRequired,
    cookies: PropTypes.object
  };

  cookieConsent() {
    return Number((this.cookies && this.cookies.get('cookieConsent')) || this.state.level);
  }

  getChildContext() {
    return {
      cookieConsent: this.cookieConsent,
      saveCookieConsent: this.saveCookieConsent,
      toggleCookieSettings: this.toggleCookieSettings,
      cookies: this.cookies
    };
  }

  saveCookieConsent(level) {
    this.cookies.set('cookieConsent', level);
    this.cookies.set('cookieAccepted', 'true');
    this.setState({openedByHash: false}, () => {
      this.setState({level: level, showCookieBar: false});
    });
    if (
      typeof window !== 'undefined' &&
      typeof window.reactGpdrSettings !== 'undefined' &&
      typeof window.reactGpdrSettings.reload !== 'undefined' &&
      window.reactGpdrSettings.reload === false
    ) {
      const elements = this.getElements('data-gdpr-lvl');

      for ( let i = 0; i < elements.length; i += 1 ) {
        if (Number(level) >= Number(elements[i].dataset.gdprLvl) && (typeof elements[i].src === 'undefined' || elements[i].src === '')) {
          elements[i].src = elements[i].dataset.gdprSrc;
        } else {
          elements[i].src = '';
        }

      }
    } else {
      window.location.reload(true);
    }
  }

  toggleCookieSettings() {
    this.setState({showCookieSettings: !this.state.showCookieSettings});
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.cookies = new CookiesJS();
      window.addEventListener('popstate', this.listener);
    }
  }

  listener(event) {
    if (
      typeof event !== 'undefined' &&
      typeof event.target !== 'undefined' &&
      typeof event.target.window !== 'undefined' &&
      typeof event.target.window.location !== 'undefined' &&
      typeof event.target.window.location.hash !== 'undefined' &&
      event.target.window.location.hash === '#cookieConsent'
    ) {
      this.setState({
        openedByHash: true,
        showCookieBar: true
      });
    }
  }

  getElements(attrib) {
    return document.querySelectorAll('[' + attrib + ']');
  }

  render() {
    return (
      <div>
        {<CookieBar open={this.state.openedByHash} /> }
      </div>
    );
  }
}

CookieConsent.propTypes = {};
CookieConsent.defaultProps = {};

export default hot(module)(CookieConsent);
