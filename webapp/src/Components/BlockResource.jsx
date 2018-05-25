import React from 'react';
import faEyeSlash from '@fortawesome/fontawesome-free-solid/faEyeSlash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {hot} from 'react-hot-loader';
import styles from './Cookiebar.scss';

class BlockResource extends React.Component {
  render() {
    return (
      <div className={styles.changeSettings}>
        <div>
          <FontAwesomeIcon icon={faEyeSlash} className={styles.mooidingetje} />
          {' '}
          Om deze resource te kunnen zien moet u de
          {' '}
          <a href={(typeof navigator !== 'undefined' ? window.location.href.split('#')[0] : '' ) + '#gdprSettings'}>cookie instellingen</a>
          {' '}
          op <strong>extern</strong> zetten.
        </div>
      </div>
    );
  }
}

BlockResource.propTypes = {};
BlockResource.defaultProps = {};

export default hot(module)(BlockResource);
