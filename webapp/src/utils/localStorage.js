import DomStorage from './domStorage';

// eslint-disable-next-line
let singleton = null;
if (singleton === null) {
  singleton = new DomStorage(global.localStorage);
}

export default singleton;
