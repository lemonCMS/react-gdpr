import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {hot} from 'react-hot-loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './Cookiebar.scss';

class Level extends Component {
  render() {
    return (
      <div
        className={classnames({
          [styles.level]: true,
          [styles.active]: this.props.active
        })}
        onClick={this.props.onClick}
        onKeyDown={this.props.onClick}
        role={'button'}
        tabIndex={0}
      >
        <div className={styles.levelTxt} dangerouslySetInnerHTML={{__html: this.props.children}} />
        {this.props.icon && <div className={styles.icon}>
          <FontAwesomeIcon icon={this.props.icon} fixedWidth size="6x" />
        </div>}
      </div>
    );
  }
}

Level.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func.isRequired
};
Level.defaultProps = {
  icon: null,
  active: false
};

export default hot(module)(Level);
