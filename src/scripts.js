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
import { domUpdates, dateInput, durationInput, travelersInput, destinationInput } from './dom-updates';

// globals
// let userID = Math.floor(Math.random() * 50);
let userID = 34;
let user;

// queries
const homeButton = document.querySelector('#homeButton');
const newTripButton = document.querySelector('#newTripButton');
const logOutButton = document.querySelector('#logOutButton');
const costEstButton = document.querySelector('#costEstButton');
const resetButton = document.querySelector('#resetButton');
const formSubmitButton = document.querySelector('#formSubmitButton');

// event listeners
window.addEventListener('load', fetchAllData);
homeButton.addEventListener('click', domUpdates.navigateToHome);
newTripButton.addEventListener('click', domUpdates.navigateToForm);
costEstButton.addEventListener('click', calculateRequestedTripCost);
resetButton.addEventListener('click', domUpdates.hideMessage);
formSubmitButton.addEventListener('click', postFormInputsToServer);

// functions
function fetchAllData() {
  apiCalls.getAllData()
  .then(data => {
    let userObj = data[0].find(entry => entry.id === userID);
    user = new UserRepository(userObj, data[1], data[2]);
    setUpUserAccount(user);
    console.log(user); // NEED TO REMOVE THIS
  });
};

function setUpUserAccount(userRepo) {
  userRepo.createTrips();
  userRepo.determineMessage();
  userRepo.calculateTotalYearCost();
  userRepo.calculateAllTimeCost();
  domUpdates.updateHeader(userRepo);
  domUpdates.populateCarousel(userRepo);
  domUpdates.populateDestinationOptions(userRepo.destinations);
};

function calculateRequestedTripCost() {
  if (checkForValidInputs()) {
    let chosenDestination = parseInt(destinationInput.value);
    let lodgingCost = user.destinations.find((entry) => {return entry.id === chosenDestination}).estimatedLodgingCostPerDay;
    let flightCost = user.destinations.find((entry) => {return entry.id === chosenDestination}).estimatedFlightCostPerPerson;
    let tripCost = (parseInt(durationInput.value) * lodgingCost)
      + (parseInt(travelersInput.value) * flightCost);
    let agentFee = tripCost * 0.1;
    let totalEst = tripCost + agentFee;
    domUpdates.displayEstimatedRequestedTripCost(totalEst);
  } else {
    domUpdates.displayInvalidInputMessage();
  }
};

function checkForValidInputs() {
  if (!dateInput.value || !durationInput.value || !travelersInput.value || !destinationInput.value) {
    return false;
  } else {
    return true;
  }
};

function postFormInputsToServer() {
  if (checkForValidInputs()) {
    let requestedTrip = {
      id: user.trips.length + 1,
      userID: user.user.id,
      destinationID: parseInt(destinationInput.value),
      travelers: parseInt(travelersInput.value),
      date: dateInput.value.split('-').join('/'),
      duration: parseInt(durationInput.value),
      status: 'pending',
      suggestedActivities: []
    };
    console.log(requestedTrip); // NEED TO REMOVE THIS
    let response = apiCalls.postData('http://localhost:3001/api/v1/trips', requestedTrip);

  } else {
    domUpdates.displayInvalidInputMessage();
  }
};
