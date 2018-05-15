import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop';
import faChartBar from '@fortawesome/fontawesome-free-solid/faChartBar';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import styles from './Cookiebar.scss';
import Level from './Level';

class CookieBar extends React.Component {
  reactGpdrSettings = {
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
  };

  state = {
    disabled: true,
    level: null
  };

  static contextTypes = {
    'toggleCookieSettings': PropTypes.func.isRequired,
    'saveCookieConsent': PropTypes.func.isRequired,
    'cookies': PropTypes.object,
    'cookieConsent': PropTypes.func
  };

  componentDidMount() {
    if (
      (window &&
        this.context.cookies.get('cookieAccepted') !== 'true') ||
      this.props.open === true
    ) {
      this.ref.style.display = 'block';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.open === true
    ) {
      this.ref.style.display = 'block';
      this.setState({level: this.context.cookieConsent(), disabled: false, amber: 'black'});
    } else if (nextProps.open === false) {
      this.ref.style.display = 'none';
    }
  }

  render() {
    let data = this.reactGpdrSettings;
    if (typeof window !== 'undefined' && typeof window.reactGpdrSettings !== 'undefined') {
      data = Object.assign({}, this.reactGpdrSettings, window.reactGpdrSettings);
    }

    const levelClick = (level) => {
      this.setState({level: Number(level), disabled: false});
    };

    const save = () => {
      this.context.saveCookieConsent(this.state.level);
    };

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
                {data.intro}
              </div>
              {data.level3 !== null &&
              <Level icon={faUsers} onClick={() => levelClick(3)} active={this.state.level === 3}>
                {data.level3}
              </Level>
              }
              {data.level2 !== null &&
              <Level icon={faChartBar} onClick={() => levelClick(2)} active={this.state.level === 2}>
                {data.level2}
              </Level>
              }
              {data.level1 !== null &&
              <Level icon={faDesktop} onClick={() => levelClick(1)} active={this.state.level === 1}>
                {data.level1}
              </Level>
              }

              <div className={styles.buttonBar}>
                {data.url && <a href={data.url}>{data.url_title}</a>}
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
