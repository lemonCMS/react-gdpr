var reactGpdrSettings = {
  reload: false,
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
