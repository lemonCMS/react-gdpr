import React, {Component} from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import config from './config';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape({
      styles: PropTypes.object,
      javascript: PropTypes.object
    }),
    bundles: PropTypes.arrayOf(PropTypes.any),
    content: PropTypes.string,
  };

  static defaultProps = {
    assets: {},
    bundles: [],
    content: ''
  };

  render() {
    const {assets, content, bundles} = this.props;
    const head = Helmet.renderStatic();

    const messages = () => {
      return `
        window.CookieBar = {
          messagesAccept: {
            1: ['a'],
            2: ['b'],
            3: ['c']
          },
          messagesDeny: {
            1: ['a D'],
            2: ['b D'],
            3: ['c D']
          },
          modal: {
            header: ''
            saveButton: 'Opslaan',
            closeButton: 'Sluiten'
          
          }
        }
      `;
    };


    const loader = () => {
      const styleSheets = assets.styles && Object.keys(assets.styles).map(style => `loadCSS('${assets.styles[style]}');`);
      return `async("/js/cssrelpreload.min.js", function () {async("/js/loadCSS.min.js", function() { ${styleSheets ? styleSheets.join(' ') : ''} });});`;
    };

    /* eslint-disable react/no-danger */
    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          {head.style.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="React Hot" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="apple-mobile-web-app-title" content="React Hot" />
          <meta name="theme-color" content="#3677dd" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {/*{assets.javascript && <link rel="preload" href={assets.javascript.main} as="script" />}*/}

          {assets.styles && Object.keys(assets.styles).map(style => <link href={assets.styles[style]} key={style} rel="preload" as="style" />)}

          <noscript>{assets.styles && Object.keys(assets.styles).map(style => <link href={assets.styles[style]} key={style} rel="stylesheet" />)}</noscript>

          {/*
            {assets.styles && Object.keys(assets.styles).map(style => <link href={assets.styles[style]} key={style} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8" />)}
          */}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: '#reactContent{display:none}'}} /> : null}
        </head>
        <body className="smart-style-4">
          <div id="reactContent" dangerouslySetInnerHTML={{__html: content}} />

          {__DLLS__ && <script key="dlls__vendor" src="/dist/dlls/dll__vendor.js" charSet="UTF-8" />}
          {assets.javascript && <script src={assets.javascript.main} charSet="UTF-8" />}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ? <script dangerouslySetInnerHTML={{__html: 'document.getElementById("reactContent").style.display="block";'}} /> : null}

          {bundles.map(bundle => bundle && <script src={config.assetsPath + bundle.file} key={bundle.id} />)}

          <script src="/js/async.js" />
          <script dangerouslySetInnerHTML={{__html: loader()}} />
          <script dangerouslySetInnerHTML={{__html: messages()}} />
        </body>
      </html>
    );
    /* eslint-enable react/no-danger */
  }
}
