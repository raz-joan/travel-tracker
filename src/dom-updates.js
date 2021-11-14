import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm';
import dayjs from 'dayjs';

// query header elements:
const welcomeBanner = document.querySelector('#welcomeBanner');
const yearCostBanner = document.querySelector('#yearCostBanner');
const allTimeCostBanner = document.querySelector('#allTimeCostBanner');
const totalNumberBanner = document.querySelector('#totalNumberBanner');

// query page sections
const homePage = document.querySelector('#homePage');
const formPage = document.querySelector('#formPage');

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
    startDay = dayjs(startDay).format('dd, MMM DD, YYYY');
    endDay = dayjs(endDay).format('dd, MMM DD, YYYY');
    return startDay + ' to ' + endDay;
  },

  populateCarousel(userRepo) {
    userRepo.updatedTrips.forEach((trip) => {
      let tripEstCost = formatter.format(trip.estCost);
      let tripAgentPercent = formatter.format(trip.agentPercent);
      let dates = this.formatDates(trip.date);
      glideSlides.innerHTML += `
        <li class="glide__slide">
          <article class="trip-card">
            <div class="info-image-container">
              <div class="destination-status-date-container">
                <h3>${trip.destination}</h3>
                <p>We hope it's full of ${userRepo.message}</p>
                <p>Trip Status: ${trip.status}</p>
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
    const glideObj = {
      type: 'carousel'
    };
    new Glide('.glide', glideObj).mount({ Controls });
  },

  navigateToHome() {
    homePage.classList.remove('hidden');
    formPage.classList.add('hidden');
  },

  navigateToForm() {
    homePage.classList.add('hidden');
    formPage.classList.remove('hidden');
  }
};

export default domUpdates;
