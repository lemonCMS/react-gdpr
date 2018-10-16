import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
//import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop';
//import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar';
//import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import styles from './Cookiebar.scss';
import Level from './Level';

class CookieBarCompact extends React.Component {

  constructor(props, context) {
    super();
    const level = context.cookieConsent();
    this.state = {
      disabled: level === null,
      level: level,
      modal: false
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
    if (this.context.config.ignoreUserAgent === false && this.context.config.whitelist === false) {
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
    if (
      nextProps.open === true
    ) {
      this.refModal.style.display = 'block';
      this.setState({level: this.context.cookieConsent(), disabled: false});
    } else if (nextProps.open === false) {
      this.refModal.style.display = 'none';
      this.ref.style.display = 'none';
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

    const choose = (
      <div
        style={{display: 'none'}}
        ref={(ref) => {
          this.refModal = ref;
        }}>

        <div className={styles['react-gdr-page-overlay']} />
        <div className={styles['react-gdr-page-modal-container']}>
          <div className={styles['react-gdr-page-modal']}>
            <div className={styles.header}
              dangerouslySetInnerHTML={{__html: data.title}} />
            <div className={styles.body}>
              <div className={styles.info}
                dangerouslySetInnerHTML={{__html: data.intro}} />
              {data.level3 !== null &&
              <Level onClick={() => levelClick(3)}
                active={this.state.level === 3}>
                {data.level3}
              </Level>
              }
              {data.level2 !== null &&
              <Level onClick={() => levelClick(2)}
                active={this.state.level === 2}>
                {data.level2}
              </Level>
              }
              {data.level1 !== null &&
              <Level onClick={() => levelClick(1)}
                active={this.state.level === 1}>
                {data.level1}
              </Level>
              }

              <div className={styles.buttonBar}>
                {data.buttonCancel !== null && <button
                  className={styles.buttonCancel}
                  onClick={() => {this.refModal.style.display = 'none';}}
                >
                  {data.buttonCancel}
                </button>}
                {' '}
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


    const bar = (
      <div
        className={styles.cookiebar}
        style={{display: 'none'}}
        ref={(ref) => {
          this.ref = ref;
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7"
              dangerouslySetInnerHTML={{__html: data.cookieBar}} />
            <div className="col-sm-5">
              <div className={styles.cbButtonBar}>
                <button className={styles.cbSettings}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    this.refModal.style.display = 'block';
                  }}>
                  {data.buttonSettings}
                </button>
                {' '}
                <button className={styles.cbButton}
                  onClick={() => this.context.saveCookieConsent(3)}>
                  {data.button}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>);

    return <React.Fragment>{choose}{bar}</React.Fragment>;
  }
}

CookieBarCompact.propTypes = {
  open: PropTypes.bool
};
CookieBarCompact.defaultProps = {
  open: false
};

export default hot(module)(CookieBarCompact);
