// This is the JavaScript entry file

// imports for webpack
import './css/base.scss';

import './images/passport-icon.png';
import './images/home-icon.png';
import './images/ticket-icon.png';
import './images/logout-icon.png';
import './images/traveling-icon.png';

import apiCalls from './api-calls';
import UserRepository from './UserRepository';

// globals
let userID = 3; // eventually this will come in from the log in page
let user;

// functions, eventListeners, etc ...
apiCalls.getAllData()
  // .then(data => console.log(data[0]))
  .then(data => {
    let userObj = data[0].find(entry => entry.id === userID);
    user = new UserRepository(userObj, data[1], data[2]);
    user.createTrips();
    user.determineMessage();
    user.calculateTotalYearCost();
    console.log(user); // fetch and methods are working!
  });
