import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import CookiesJS from 'universal-cookie';
import CookieBar from './Components/CookieBar';
import CookieSettings from './Components/CookieSettings';

class CookieConsent extends React.Component {
  cookies = null;

  constructor() {
    super();
    this.toggleCookieSettings = this.toggleCookieSettings.bind(this);
    this.saveCookieConsent = this.saveCookieConsent.bind(this);
    this.state = {
      showCookieSettings: false,
      showCookieBar: true
    };
    if (typeof window !== 'undefined') {
      this.cookies = new CookiesJS();
    }
  }

  static childContextTypes = {
    cookieConsent: PropTypes.number.isRequired,
    toggleCookieSettings: PropTypes.func.isRequired,
    saveCookieConsent: PropTypes.func.isRequired,
    cookies: PropTypes.object
  };

  getChildContext() {
    return {
      cookieConsent: Number((this.cookies && this.cookies.get('cookieConsent')) || 1),
      saveCookieConsent: this.saveCookieConsent,
      toggleCookieSettings: this.toggleCookieSettings,
      cookies: this.cookies
    };
  }

  saveCookieConsent(level) {
    this.cookies.set('cookieConsent', level);
    this.cookies.set('cookieAccepted', 'true');
    this.setState({showCookieBar: false});
  }

  toggleCookieSettings() {
    this.setState({showCookieSettings: !this.state.showCookieSettings});
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.cookies = new CookiesJS();
    }
  }

  render() {
    console.log(typeof window !== 'undefined' ? window : 'niks');
    return (
      <div>
        <CookieSettings showModal={this.state.showCookieSettings} close={this.toggleCookieSettings} />
        {this.state.showCookieBar && <CookieBar /> }
      </div>
    );
  }
}

CookieConsent.propTypes = {};
CookieConsent.defaultProps = {};

export default hot(module)(CookieConsent);
