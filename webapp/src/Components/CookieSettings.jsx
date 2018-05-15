import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Button, Modal} from 'react-bootstrap';
import {hot} from 'react-hot-loader';

class CookieSettings extends React.Component {
  constructor() {
    super();
    this.update = this.update.bind(this);
    this.state = {
      cookieConsent: 1
    };

    this.modal = {
      header: 'Cookie instellingen',
      body: '<p>jajajajajaj</p>',
      levels: {
        1: {name: 'strikt', accept: [], deny: []},
        2: {name: 'statistiek', accept: [], deny: []},
        3: {name: 'extern', accept: [], deny: []},
      },
      saveButton: 'Accepteren',
      closeButton: 'Sluiten'
    };
  }

  static contextTypes = {
    cookieConsent: PropTypes.number.isRequired,
    saveCookieConsent: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.setState({cookieConsent: this.context.cookieConsent});
  }

  update(event) {
    this.setState({cookieConsent: Number(event.target.value)});
  }

  render() {
    let data = Object.assign({}, this.modal);
    if (typeof window !== 'undefined' && window.CookieBar && window.CookieBar.modal) {
      data = Object.assign({}, data, window.CookieBar.modal);
    }

    return (
      <Modal show={this.props.showModal}
        onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>{data.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{__html: data.body}} />
          <div className="cookiechoose">
            <div className="btn-group">
              {Object.entries(data.levels).map((item, key) => (
                <label
                  key={key}
                  className={classNames({
                    'btn': true,
                    'btn-info': true,
                    'active': this.state.cookieConsent >= Number(item[0])
                  })}
                  htmlFor={`r${item[0]}`}>
                  <input
                    type={'radio'}
                    className={'hidden'}
                    id={`r${item[0]}`}
                    name={`r${item[0]}`}
                    value={item[0]}
                    checked={this.state.cookieConsent === Number(item[0])}
                    onChange={this.update} />
                  {' '}
                  {item[1].name}
                </label>

              ))}
            </div>
          </div>

          <div className="cookiespecs cookielow">
            <div className="row">
              <div className="col-md-6">
                <h4>Deze website zal wel:</h4>
                <ul>
                  {data.levels[this.state.cookieConsent].accept.map((item, key) => (
                    <li key={key}><i className="fa fa-fw fa-check" />{' '}{item}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <h4>Deze website zal niet:</h4>
                <ul>
                  {data.levels[this.state.cookieConsent].deny.map((item, key) => (
                    <li key={key}><i className="fa fa-fw fa-close" />{' '}{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer key="footer">
          <Button onClick={this.props.close}>{data.saveButton}</Button>

          <Button bsStyle="primary"
            onClick={() => {
              this.context.saveCookieConsent(this.state.cookieConsent);
              this.props.close();
            }}>
            {data.closeButton}
          </Button>

        </Modal.Footer>
      </Modal>
    );
  }
}

CookieSettings.propTypes = {
  showModal: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};
CookieSettings.defaultProps = {};

export default hot(module)(CookieSettings);
