# React GDPR

To add a easy cookieconsent compliant to the may 2018 rules.

## Install

````git clone git@github.com:lemonCMS/react-gdpr.git ````

Put the following code somewere in your website.
````html
<head>
    <link rel="stylesheet" href="webapp/static/dist/main.css" charset="UTF-8"/>
</head>
<body>
  ....
  // Put right before the closing body tag
  <div id="reactContent"></div>
  <script src="/dist/gdpr.js" type="text/javascript" charSet="UTF-8" />
</body>

````

Now you will have the default DUTCH cookie consent modal.

Now you need to make changes to your code.

### code changes
Lets say you embed youtube movies.
````html
<iframe charSet="UTF-8" width="560" height="315" src="https://www.youtube-nocookie.com/embed/Ur_tXqaNXOI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
````

You need to change that into

````html
<iframe charSet="UTF-8" width="560" height="315" data-gdpr-lvl="3" data-gdpr-src="https://www.youtube-nocookie.com/embed/Ur_tXqaNXOI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
````

###What we did

Change ```src``` to ```data-gdpr-src```

Add ```data-gdpr-lvl```

| data-gdpr-lvl  |  description |
|---|---|
| 1 | strictly necessary |
| 2 | + statistics |
| 3 | + external youtube, facebook, twitter addthis etc |

###Config

```html
<script>
var reactGpdrSettings = {
//Reload the page, for sererside changes
  reload: false, 
//Do not show cookie consent for these useragents
  ignoreUserAgent: /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent), 
  title: 'Deze website gebruikt cookies',
  intro: 'Daarmee zorgen we dat de website werkt en je kunt inloggen. Selecteer één van de drie opties en klik op\n' +
  '                ‘Accepteren’.',
  url: '/cookies',
  url_title: 'privacy- en cookieverklaring.',
  button: 'Accepteren',
  level1: '1 Cookies zonder video&#39;s en zonder aanbiedingen. Deze zijn nodig om onze website te kunnen bezoeken en\n' +
  '                in te kunnen loggen. Je bezoek en gegevens worden niet bijgehouden.',
  level2: '2 Cookies met video&#39;s maar zonder aanbiedingen. Met deze cookies kun je de website bezoeken,\n' +
  '                inloggen en video&#39;s bekijken. Je bezoek en gegevens worden bijgehouden.',
  level3: '3 Cookies met video&#39;s en aanbiedingen. Met deze cookies werkt de website optimaal. Je bezoek wordt\n' +
  '                bijgehouden zodat we onze website kunnen verbeteren en je aanbiedingen kunnen doen.',
  iFrameBlob: '<html><h3>You are not allowed to view this resource, change your <a href="' + window.location.href.replace(window.location.hash, '') + '#cookieConsent" target="_top">cookiesettings</a></h3></html>'
};
    </script>
```

###Api
Call the cookie consent window from anywhere
```html
<a href="#cookieConsent">Cookie settings</a>
```
