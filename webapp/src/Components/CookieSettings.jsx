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

    this.messages = {
      1: ['Noodzakelijke cookies plaatsen'],
      2: ['Noodzakelijke cookies plaatsen', 'Anonieme statistieken bijhouden'],
      3: ['Noodzakelijke cookies plaatsen', 'Anonieme statistieken bijhouden', 'Social media deelmogelijkheden laden', 'Remarketing doeleinden'],
    };
    this.messagesNot = {
      1: ['Anonieme statistieken bijhouden', 'Social media deelmogelijkheden laden', 'Identificeerbare informatie delen', 'Remarketing doeleinden'],
      2: ['Social media deelmogelijkheden laden', 'Identificeerbare informatie delen', 'Remarketing doeleinden'],
      3: ['Identificeerbare informatie delen']
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
    return (
      <Modal show={this.props.showModal}
        onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Cookie instellingen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Wij maken bij het aanbieden van elektronische diensten gebruik van cookies. Een cookie is een eenvoudig klein bestandje dat met pagina’s van deze website wordt
            meegestuurd en door uw browser op de harde schijf van uw computer wordt opgeslagen. Daarmee kunnen wij onder andere verschillende opvragingen van pagina’s van de
            Website combineren en het gedrag van gebruikers analyseren.
          </p>
          <p>
            Via onderstaande instellingen kunt u aangeven welke cookies u wilt accepteren. Houd er rekening mee dat door het niet accepteren van cookies een deel van de
            functionaliteit van deze website niet beschikbaar kan zijn.
          </p>

          <div className="cookiechoose">
            <div className="btn-group">
              <label
                className={classNames({
                  'btn': true,
                  'btn-info': true,
                  'active': this.state.cookieConsent >= 1
                })}
                htmlFor="r1">
                <input
                  type={'radio'}
                  className={'hidden'}
                  id={'r1'}
                  name="r1"
                  value={1}
                  checked={this.state.cookieConsent === 1}
                  onChange={this.update} /> Strikt
              </label>
              <label
                className={classNames({
                  'btn': true,
                  'btn-info': true,
                  'active': this.state.cookieConsent >= 2
                })}
                htmlFor="r2">
                <input type={'radio'}
                  id={'r2'}
                  className={'hidden'}
                  name="r1"
                  value={2}
                  checked={this.state.cookieConsent === 2}
                  onChange={this.update} /> <i className="fa fa-fw fa-plus" />  Statistiek
              </label>
              <label
                className={classNames({
                  'btn': true,
                  'btn-info': true,
                  'active': this.state.cookieConsent === 3
                })}
                htmlFor="r3">
                <input type={'radio'}
                  id={'r3'}
                  className={'hidden'}
                  name="r1"
                  value={3}
                  checked={this.state.cookieConsent === 3}
                  onChange={this.update} /> <i className="fa fa-fw fa-plus" /> Extern
              </label>
            </div>
          </div>

          <div className="cookiespecs cookielow">
            <div className="row">
              <div className="col-md-6">
                <h4>Deze website zal wel:</h4>
                <ul>
                  {this.messages[this.state.cookieConsent].map((item, key) => (
                    <li key={key}><i className="fa fa-fw fa-check" />{' '}{item}</li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <h4>Deze website zal niet:</h4>
                <ul>
                  {this.messagesNot[this.state.cookieConsent].map((item, key) => (
                    <li key={key}><i className="fa fa-fw fa-close" />{' '}{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer key="footer">
          <Button onClick={this.props.close}>Sluiten</Button>

          <Button bsStyle="primary"
            onClick={() => {
              this.context.saveCookieConsent(this.state.cookieConsent);
              this.props.close();
            }}>
            Opslaan
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
