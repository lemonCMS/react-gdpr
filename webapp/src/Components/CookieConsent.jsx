import React from 'react';
import ReactDomServer from 'react-dom/server';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import CookiesJS from 'universal-cookie';
import uniqid from 'uniqid';
import CookieBar from './CookieBar';
import BlockResource from './BlockResource';

class CookieConsent extends React.Component {
  config = {
    reload: false,
    ignoreUserAgent: /bot|googlebot|crawler|spider|robot|crawling|page speed/i.test(typeof navigator !== 'undefined' ? navigator.userAgent : 'xxxx'),
    whitelist: /privacy/i.test(typeof window !== 'undefined' ? window.location.href : 'xxxx'),
    title: 'Deze website gebruikt cookies',
    intro: 'Daarmee zorgen we dat de website werkt en je kunt inloggen. Selecteer één van de drie opties en klik op\n' +
    '                &#39;Accepteren&#39;. Bekijk onze <a href="/privacy">privacy- en cookieverklaring</a>',
    button: 'Accepteren',
    level1: null,
    level2: null,
    level3: null,
    /*level1: '<h4>Strikt:</h4> Cookies zonder video&#39;s en zonder aanbiedingen. Deze zijn nodig om onze website te kunnen bezoeken en\n' +
    '                in te kunnen loggen. Je bezoek en gegevens worden niet bijgehouden.',
    level2: '<h4>Statistieken:</h4> Cookies met video&#39;s maar zonder aanbiedingen. Met deze cookies kun je de website bezoeken,\n' +
    '                inloggen en video&#39;s bekijken. Je bezoek en gegevens worden bijgehouden.',
    level3: '<h4>Extern:</h4> Cookies met video&#39;s en aanbiedingen. Met deze cookies werkt de website optimaal. Je bezoek wordt\n' +
    '                bijgehouden zodat we onze website kunnen verbeteren en je aanbiedingen kunnen doen.',*/
    iFrameBlob: ReactDomServer.renderToStaticMarkup(<BlockResource />),
  };
  cookies = null;
  cookieOptions = {
    path: '/',
    expires: new Date(new Date().getTime() + (60 * 60 * 1000 * 24 * (365 * 1))) //1 year
  };
  iFrameBlobData = null;

  constructor() {
    super();
    this.toggleCookieSettings = this.toggleCookieSettings.bind(this);
    this.saveCookieConsent = this.saveCookieConsent.bind(this);
    this.listener = this.listener.bind(this);
    this.cookieConsentLvl = this.cookieConsentLvl.bind(this);
    this.iframeBlob = this.iframeBlob.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.getDomainName = this.getDomainName.bind(this);
    this.init = this.init.bind(this);
    this.state = {
      showCookieSettings: false,
      showCookieBar: true,
      openedByHash: false
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
    }
    return Number((this.cookies && this.cookies.get('cookieConsent'))) || null;
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

  getDomainName() {
    let i = 0;
    let domain = document.domain;
    const p = domain.split('.');
    const s = '_gd' + (new Date()).getTime();

    while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) === -1) {
      domain = p.slice(-1 - (i += 1)).join('.');
      document.cookie = s + '=' + s + ';domain=' + domain + ';';
    }
    document.cookie = s + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + domain + ';';
    return domain;

  }


  saveCookieConsent(level) {
    this.cookieOptions.domain = this.getDomainName(window.location.host);
    this.cookies.set('cookieConsent', level, this.cookieOptions);
    this.cookies.set('cookieAccepted', 'true', this.cookieOptions);
    this.setState({openedByHash: false, showCookieBar: false});
    if (this.config.reload === false) {
      this.updateDoc();
      if (typeof window.history !== 'undefined' && typeof window.history.pushState !== 'undefined') {
        window.history.pushState(null, null, window.location.href.split('#')[0]);
      } else {
        window.location.hash = '';
      }
    } else {
      window.location.reload(true);
    }
  }

  toggleCookieSettings() {
    this.setState({showCookieSettings: !this.state.showCookieSettings});
  }

  iframeBlob() {
    if (this.iFrameBlobData) {
      return this.iFrameBlobData;
    }
    const blob = new Blob([this.config.iFrameBlob], {type: 'text/html'});
    this.iFrameBlobData = URL.createObjectURL(blob);
    return this.iFrameBlobData;
  }

  componentWillMount() {
    if (
      typeof window !== 'undefined' &&
      typeof window.location !== 'undefined' &&
      typeof window.location.hash !== 'undefined' &&
      window.location.hash === '#cookieConsent'
    ) {
      this.setState({
        openedByHash: true,
        showCookieBar: true
      });
    }
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

      window.addEventListener('hashchange', this.listener);
      this.updateDoc();
    }
  }

  updateDoc() {
    const elements = this.getElements('data-gdpr-lvl');
    const level = this.cookieConsentLvl();
    for (let i = 0; i < elements.length; i += 1) {
      if (Number(level) >= Number(elements[i].dataset.gdprLvl)) {
        if ((typeof elements[i].src === 'undefined' || elements[i].src === '' || elements[i].dataset.gdprPlaceholder)) {
          elements[i].src = elements[i].dataset.gdprSrc;
          if (elements[i].dataset.gdprPlaceholder) {
            delete elements[i].dataset.gdprPlaceholder;
            const id = elements[i].dataset.gdprUniqId;
            elements[i].style.display = elements[i].dataset.gdprDisplay;
            const child = document.getElementById(id);
            if (child) {
              child.parentNode.removeChild(child);
            }
          }
        }
      } else {
        elements[i].removeAttribute('src');
        if (elements[i].tagName === 'IFRAME' || elements[i].tagName === 'IMG') {
          if (!elements[i].dataset.gdprPlaceholder) {
            let render = true;
            if (elements[i].hasAttribute('width')) {
              const width = elements[i].getAttribute('width');
              if (width === '1') {
                render = false
              }
            }

            if (render === true) {
              elements[i].dataset.gdprDisplay = elements[i].style.display;
              elements[i].style.display = 'none';
              const child = document.createElement('div');
              const id = `gdpr-${uniqid()}`;

              elements[i].dataset.gdprPlaceholder = true;
              elements[i].dataset.gdprUniqId = id;
              child.setAttribute('id', id);
              child.setAttribute('class', 'gdpr-legacy');

              if (elements[i].nextSibling) {
                elements[i].parentNode.insertBefore(child, elements[i].nextSibling);
              } else {
                elements[i].parentNode.appendChild(child);
              }
              child.innerHTML = this.config.iFrameBlob;
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
      <div className={'gdpr-support'}>
        {<CookieBar open={this.state.openedByHash} />}
      </div>
    );
  }
}

CookieConsent.propTypes = {};
CookieConsent.defaultProps = {};

export default hot(module)(CookieConsent);
