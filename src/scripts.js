// This is the JavaScript entry file

// imports for webpack
import './css/base.scss';

import './images/passport-icon.png';
import './images/home-icon.png';
import './images/ticket-icon.png';
import './images/logout-icon.png';
import './images/traveling-icon.png';

import apiCalls from './api-calls';

// globals
let userID = 3;

// functions, eventListeners, etc ...
apiCalls.getAllData().then(data => console.log(data));
