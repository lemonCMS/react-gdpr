import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
//import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop';
//import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar';
//import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import styles from './Cookiebar.scss';
import Level from './Level';

class CookieBar extends React.Component {


  constructor(props, context) {
    super();
    const level = context.cookieConsent();
    this.state = {
      disabled: level === null,
      level: level
    };
  }

  static contextTypes = {
    'toggleCookieSettings': PropTypes.func.isRequired,
    'saveCookieConsent': PropTypes.func.isRequired,
    'cookies': PropTypes.object,
    'cookieConsent': PropTypes.func,
    'config': PropTypes.object
  };

  componentDidMount() {
    if (this.context.config.ignoreUserAgent === false) {
      if (
        (window &&
          this.context.cookies.get('cookieAccepted') !== 'true') ||
        this.props.open === true

      ) {
        this.ref.style.display = 'block';
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.context.config.ignoreUserAgent === false) {
      if (
        nextProps.open === true
      ) {
        this.ref.style.display = 'block';
        this.setState({level: this.context.cookieConsent(), disabled: false, amber: 'black'});
      } else if (nextProps.open === false) {
        this.ref.style.display = 'none';
      }
    }
  }

  render() {
    const data = this.context.config;
    const levelClick = (level) => {
      this.setState({level: Number(level), disabled: false});
    };

    const save = () => {
      this.context.saveCookieConsent(this.state.level);
    };

    console.log(this.state);
    return (
      <div
        style={{display: 'none'}}
        ref={(ref) => {
          this.ref = ref;
        }}>

        <div className={styles['react-gdr-page-overlay']} />
        <div className={styles['react-gdr-page-modal-container']}>
          <div className={styles['react-gdr-page-modal']}>
            <div className={styles.header}>
              {data.title}
            </div>
            <div className={styles.body}>
              <div className={styles.info}>
                {data.intro} {data.url && <a href={data.url}>{data.url_title}</a>}
              </div>
              {data.level3 !== null &&
              <Level onClick={() => levelClick(3)} active={this.state.level === 3}>
                {data.level3}
              </Level>
              }
              {data.level2 !== null &&
              <Level onClick={() => levelClick(2)} active={this.state.level === 2}>
                {data.level2}
              </Level>
              }
              {data.level1 !== null &&
              <Level onClick={() => levelClick(1)} active={this.state.level === 1}>
                {data.level1}
              </Level>
              }

              <div className={styles.buttonBar}>
                <button
                  className={styles.button}
                  disabled={this.state.disabled}
                  onClick={save}
                >
                  {data.button}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CookieBar.propTypes = {
  open: PropTypes.bool
};
CookieBar.defaultProps = {
  open: false
};

export default hot(module)(CookieBar);
