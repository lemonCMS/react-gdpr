import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import CookiesJS from 'universal-cookie';
import CookieBar from './Components/CookieBar';

class CookieConsent extends React.Component {
  config = {
    reload: false,
    ignoreUserAgent: /bot|googlebot|crawler|spider|robot|crawling/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : 'xxxx'),
    title: 'Deze website gebruikt cookies',
    intro: 'Daarmee zorgen we dat de website werkt en je kunt inloggen. Selecteer één van de drie opties en klik op\n' +
    '                ‘Accepteren’.',
    url: '/cookies',
    url_title: 'privacy- en cookieverklaring.',
    button: 'Accepteren',
    level1: 'Cookies zonder video&#39;s en zonder aanbiedingen. Deze zijn nodig om onze website te kunnen bezoeken en\n' +
    '                in te kunnen loggen. Je bezoek en gegevens worden niet bijgehouden.',
    level2: 'Cookies met video&#39;s maar zonder aanbiedingen. Met deze cookies kun je de website bezoeken,\n' +
    '                inloggen en video&#39;s bekijken. Je bezoek en gegevens worden bijgehouden.',
    level3: ' Cookies met video&#39;s en aanbiedingen. Met deze cookies werkt de website optimaal. Je bezoek wordt\n' +
    '                bijgehouden zodat we onze website kunnen verbeteren en je aanbiedingen kunnen doen.',
    iFrameBlob: '<html><h3>You are not allowed to view this resource, change your <a href="' +
    window.location.href.replace(window.location.hash, '') +
    '#cookieConsent" target="_top">cookiesettings</a></h3></html>'
  };
  cookies = null;
  cookieOptions = {
    path: '/',
    expires: new Date(new Date().getTime() + (60 * 60 * 1000 * 24 * (365 * 5))) //5 years
  };
  iframeBlobData = null;

  constructor() {
    super();
    this.toggleCookieSettings = this.toggleCookieSettings.bind(this);
    this.saveCookieConsent = this.saveCookieConsent.bind(this);
    this.listener = this.listener.bind(this);
    this.cookieConsentLvl = this.cookieConsentLvl.bind(this);
    this.iframeBlob = this.iframeBlob.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.init = this.init.bind(this);
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
    cookies: PropTypes.object,
    config: PropTypes.object
  };

  cookieConsentLvl() {
    if (this.config.ignoreUserAgent === true) {
      return 3;
    } else {
      return Number((this.cookies && this.cookies.get('cookieConsent')) || this.state.level);
    }
  }

  getChildContext() {
    return {
      cookieConsent: this.cookieConsentLvl,
      saveCookieConsent: this.saveCookieConsent,
      toggleCookieSettings: this.toggleCookieSettings,
      cookies: this.cookies,
      config: this.config
    };
  }

  saveCookieConsent(level) {
    this.cookies.set('cookieConsent', level, this.cookieOptions);
    this.cookies.set('cookieAccepted', 'true', this.cookieOptions);
    this.setState({openedByHash: false}, () => {
      this.setState({level: level, showCookieBar: false});
    });
    if (
      this.config.readonly === false
    ) {
      this.updateDoc();
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
    const blob = new Blob([this.config.iFrameBlob], {type: 'text/html'});
    this.iframeBlobData = URL.createObjectURL(blob);
    return this.iframeBlobData;
  }


  componentWillMount() {
    this.init();
  }

  componentDidMount() {
    this.init();
  }

  init() {
    if (typeof window !== 'undefined') {
      this.cookies = new CookiesJS();

      if (typeof window !== 'undefined' && typeof window.reactGpdrSettings !== 'undefined') {
        this.config = Object.assign({}, this.config, window.reactGpdrSettings);
      }

      window.addEventListener('popstate', this.listener);
      this.updateDoc();
    }
  }

  updateDoc() {
    if (this.cookies.get('cookieAccepted') || this.config.ignoreUserAgent === true) {
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
