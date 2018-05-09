import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import styles from './Cookiebar.scss';

class CookieBar extends React.Component {

  state = {
    clicked: false
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

    return (
      <div style={{display: 'none'}}
        ref={(ref) => {
          this.ref = ref;
        }}>
        <div id={'react-gdr-cookiebar'} className={styles['react-gdr-cookiebar']}>

          <button className="btn"
            onClick={this.context.toggleCookieSettings}>instellingen
          </button>
          {' '}
          <button className="btn btn-primary"
            onClick={click}>Accepteren
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
