import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm';

// query header elements:
const welcomeBanner = document.querySelector('#welcomeBanner');
const totalCostBanner = document.querySelector('#totalCostBanner');

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
    const totalMoney = formatter.format(userRepo.totalYearCost);
    totalCostBanner.innerText = `${totalMoney}`;
  },

  populateCarousel(userRepo) {
    userRepo.updatedTrips.forEach((trip) => {
      let tripEstCost = formatter.format(trip.estCost);
      let tripAgentPercent = formatter.format(trip.agentPercent);
      glideSlides.innerHTML += `
        <li class="glide__slide">
          <article class="trip-card">
            <div class="info-image-container">
              <div class="destination-status-date-container">
                <h3>${trip.destination}</h3>
                <p>${trip.date}</p>
                <p>This trip is: ${trip.status}.</p>
              </div>
              <img class="trip-image" src=${trip.img} alt=${trip.alt}>
            </div>
            <div class="message-cost-container">
              <p>Get ready${userRepo.message}</p>
              <p class="est-cost">Estimated Trip Cost: ${tripEstCost}, plus a 10% agent fee: ${tripAgentPercent}</p>
            </div>
          </article>
        </li>`;
    });
    const glideObj = {
      type: 'carousel'
    };
    new Glide('.glide', glideObj).mount({ Controls });
  }
};

export default domUpdates;
