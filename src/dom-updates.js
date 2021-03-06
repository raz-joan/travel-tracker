import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm';
import dayjs from 'dayjs';

// global
let myGlideSlider;
let pendingColorUpdate = 'green';

// query header elements:
const welcomeBanner = document.querySelector('#welcomeBanner');
const yearCostBanner = document.querySelector('#yearCostBanner');
const allTimeCostBanner = document.querySelector('#allTimeCostBanner');
const totalNumberBanner = document.querySelector('#totalNumberBanner');
const header = document.querySelector('#header');

// query page sections
const homePage = document.querySelector('#homePage');
const formPage = document.querySelector('#formPage');
const footer = document.querySelector('#footer');

// query form elements
const dateInput = document.querySelector('#dateInput');
const durationInput = document.querySelector('#durationInput');
const travelersInput = document.querySelector('#travelersInput');
const destinationInput = document.querySelector('#destinationInput');
const formMessage = document.querySelector('#formMessage');
const newTripForm = document.querySelector('#newTripForm');

// query log in elements
const logInResponse = document.querySelector('#logInResponse');
const logInForm = document.querySelector('#logInForm');
const logInPage = document.querySelector('#logInPage');

// query glide elements:
const glideSlides = document.querySelector('#glideSlides');

// number formatter
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

let domUpdates = {
  updateHeader(userRepo) {
    const firstName = userRepo.user.name.split(' ')[0];
    welcomeBanner.innerText = ` ${firstName}`;
    const totalYear = formatter.format(userRepo.totalYearCost);
    const totalAllTime = formatter.format(userRepo.totalAllTimeCost);
    yearCostBanner.innerText = `${totalYear}`;
    totalNumberBanner.innerText = `${userRepo.updatedTrips.length}`;
    allTimeCostBanner.innerText = `${totalAllTime}`;
  },

  formatDates(startDate) {
    let start = new Date(startDate);
    let startDay = dayjs(start);
    let endDay = dayjs(startDay).add(7, 'day');
    startDay = dayjs(startDay).format('dddd, MMM DD, YYYY');
    endDay = dayjs(endDay).format('MMM DD, YYYY');
    return startDay + ' to ' + endDay;
  },

  populateCarousel(userRepo) {
    glideSlides.innerHTML = '';
    userRepo.updatedTrips.forEach((trip) => {
      let tripEstCost = formatter.format(trip.estCost);
      let tripAgentPercent = formatter.format(trip.agentPercent);
      let dates = this.formatDates(trip.date);
      if (trip.status === 'pending') {
        pendingColorUpdate = 'orange';
      } else {
        pendingColorUpdate = 'green';
      }
      glideSlides.innerHTML += `
        <li class="glide__slide">
          <article class="trip-card">
            <div class="info-image-container">
              <div class="destination-status-date-container">
                <h1>${trip.destination}</h1>
                <div>
                  <p class="trip-messages">We hope it's full of ${userRepo.message}</p>
                  <p class="${pendingColorUpdate}">Trip Status: ${trip.status}</p>
                </div>
              </div>
              <img class="trip-image" src=${trip.img} alt=${trip.alt}>
            </div>
            <div class="message-cost-container">
              <p>${dates}</p>
              <p class="est-cost">Estimated Trip Cost: ${tripEstCost}, plus a 10% agent fee: ${tripAgentPercent}</p>
            </div>
          </article>
        </li>`;
    });
    myGlideSlider = new Glide('.glide').mount({ Controls });
  },

  navigateToHome() {
    homePage.classList.remove('hidden');
    header.classList.remove('hidden');
    footer.classList.remove('hidden');
    formPage.classList.add('hidden');
    myGlideSlider.update();
  },

  navigateToForm() {
    homePage.classList.add('hidden');
    formPage.classList.remove('hidden');
  },

  populateDestinationOptions(destinations) {
    destinationInput.innerHTML = `<option value="">--Please choose an option--</option>`;
    destinations.forEach((place) => {
      destinationInput.innerHTML += `<option value="${place.id}">${place.destination}</option>`;
    });
  },

  displayEstimatedRequestedTripCost(cost) {
    let newCost = formatter.format(cost);
    formMessage.innerText = `The estimated trip cost, which includes the 10% agent fee, is ${newCost}.`;
    formMessage.classList.remove('hidden');
  },

  hideMessage() {
    formMessage.classList.add('hidden');
  },

  displayInvalidInputMessage() {
    formMessage.innerText = `Please check that all inputs are filled in correctly.`;
    formMessage.classList.remove('hidden');
  },

  displaySuccessMessageUponPost(duration, place) {
    formMessage.innerText = `Your ${duration} day trip to ${place} has been requested.`;
    formMessage.classList.remove('hidden');
    setTimeout(() => {
      this.formReset();
    }, 3000);
    setTimeout(() => {
      this.navigateToHome();
    }, 3000);
  },

  formReset() {
    newTripForm.reset();
    this.hideMessage();
  },

  showErrorForLogIn() {
    logInResponse.classList.remove('hidden');
    logInForm.reset();
  },

  hideLogIn() {
    logInPage.classList.add('hidden');
    logInResponse.classList.add('hidden');
    logInForm.reset();
  },

  redirectToLogInPage() {
    header.classList.add('hidden');
    homePage.classList.add('hidden');
    formPage.classList.add('hidden');
    footer.classList.add('hidden');
    logInPage.classList.remove('hidden');
  }
};

export { domUpdates, dateInput, durationInput, travelersInput, destinationInput };
