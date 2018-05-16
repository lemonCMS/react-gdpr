import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import CookiesJS from 'universal-cookie';
import CookieBar from './Components/CookieBar';

class CookieConsent extends React.Component {
  cookies = null;
  cookieOptions = {
    path: '/',
    expires: new Date(new Date().getTime()+60*60*1000*24*(365*5)) //5 years
  };
  iframeBlobData = null;

  constructor() {
    super();
    this.toggleCookieSettings = this.toggleCookieSettings.bind(this);
    this.saveCookieConsent = this.saveCookieConsent.bind(this);
    this.listener = this.listener.bind(this);
    this.cookieConsentLvl = this.cookieConsentLvl.bind(this);
    this.iframeBlob = this.iframeBlob.bind(this);
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

  cookieConsentLvl() {
    return Number((this.cookies && this.cookies.get('cookieConsent')) || this.state.level);
  }

  getChildContext() {
    return {
      cookieConsent: this.cookieConsentLvl,
      saveCookieConsent: this.saveCookieConsent,
      toggleCookieSettings: this.toggleCookieSettings,
      cookies: this.cookies
    };
  }

  saveCookieConsent(level) {
    this.cookies.set('cookieConsent', level, this.cookieOptions);
    this.cookies.set('cookieAccepted', 'true', this.cookieOptions);
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

      for (let i = 0; i < elements.length; i += 1) {
        if (Number(level) >= Number(elements[i].dataset.gdprLvl)) {
          if (
            (typeof elements[i].src === 'undefined' || elements[i].src === '' || elements[i].dataset.gdprPlaceholder)) {
            elements[i].src = elements[i].dataset.gdprSrc;
            if (elements[i].dataset.gdprPlaceholder) {
              delete elements[i].dataset.gdprPlaceholder;
            }
          }
        } else {
          elements[i].removeAttribute('src');
          if (elements[i].tagName === 'IFRAME') {
            elements[i].setAttribute('src', this.iframeBlob());
            elements[i].dataset.gdprPlaceholder = true;
          }
        }
      }
    } else {
      window.location.reload(true);
    }
  }

  toggleCookieSettings() {
    this.setState({showCookieSettings: !this.state.showCookieSettings});
  }

  iframeBlob() {
    if (this.iframeBlobData) {
      return this.iframeBlobData;
    }
    const loc = window.location.href.replace(window.location.hash, '');
    const html = `<html><h3>You are not allowed to view this resource, change your <a href="${loc}#cookieConsent" target="_top">cookiesettings</a></h3></html>`;
    const blob = new Blob([html], {type: 'text/html'});
    this.iframeBlobData = URL.createObjectURL(blob);
    return this.iframeBlobData;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.cookies = new CookiesJS();
      window.addEventListener('popstate', this.listener);

      if (this.cookies.get('cookieAccepted')) {
        const elements = this.getElements('data-gdpr-lvl');
        const level = this.cookieConsentLvl();
        for (let i = 0; i < elements.length; i += 1) {
          if (Number(level) >= Number(elements[i].dataset.gdprLvl)) {
            if ((typeof elements[i].src === 'undefined' || elements[i].src === '' || elements[i].dataset.gdprPlaceholder)) {
              elements[i].src = elements[i].dataset.gdprSrc;
              if (elements[i].dataset.gdprPlaceholder) {
                delete elements[i].dataset.gdprPlaceholder;
              }
            }
          } else {
            elements[i].removeAttribute('src');
            if (elements[i].tagName === 'IFRAME') {
              elements[i].setAttribute('src', this.iframeBlob());
              elements[i].dataset.gdprPlaceholder = true;
            }
          }
        }
      }
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
        {<CookieBar open={this.state.openedByHash} />}
      </div>
    );
  }
}

CookieConsent.propTypes = {};
CookieConsent.defaultProps = {};

export default hot(module)(CookieConsent);
