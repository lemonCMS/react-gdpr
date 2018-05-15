import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import styles from './Cookiebar.scss';

class CookieBar extends React.Component {

  state = {
    clicked: false
  };

  data = {
    info: '<a href="">bij de cookiemelding</a>',
    settingsButton: 'instellingen',
    acceptButton: 'accepteren'
  };

  static contextTypes = {
    'toggleCookieSettings': PropTypes.func.isRequired,
    'saveCookieConsent': PropTypes.func.isRequired,
    'cookies': PropTypes.object
  };

  componentDidMount() {
    if (window && this.context.cookies.get('cookieAccepted') !== 'true') {
      this.ref.style.display = 'block';
    }
  }

  render() {
    const click = () => {
      this.setState({clicked: true}, () => {
        this.context.saveCookieConsent(3);
        this.ref.style.display = 'none';
      });
    };

    let data = Object.assign({}, this.modal);
    if (typeof window !== 'undefined' && window.CookieBar && window.CookieBar.bar) {
      data = Object.assign({}, data, window.CookieBar.bar);
    }

    return (
      <div style={{display: 'none'}}
        ref={(ref) => {
          this.ref = ref;
        }}>
        <div id={'react-gdr-cookiebar'} className={styles['react-gdr-cookiebar']}>
          <div dangerouslySetInnerHTML={{__html: data.bar.info}}/>
          <button className="btn"
            onClick={this.context.toggleCookieSettings}>{data.settingsButton}
          </button>
          {' '}
          <button className="btn btn-primary"
            onClick={click}>>{data.acceptButton}
          </button>


        </div>
        <div className={styles['react-gdr-cookiebar-opacity']} />
      </div>
    );
  }
}

CookieBar.propTypes = {};
CookieBar.defaultProps = {};

export default hot(module)(CookieBar);
