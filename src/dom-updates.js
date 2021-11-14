// import Glide from '@glidejs/glide';
import Glide, { Controls } from '@glidejs/glide/dist/glide.modular.esm';

// query header elements:
const welcomeBanner = document.querySelector('#welcomeBanner');
const totalCostBanner = document.querySelector('#totalCostBanner');

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
    const glideObj = {
      type: 'carousel'
    };
    new Glide('.glide', glideObj).mount({ Controls });
    // new Glide('.glide').mount();
    // look at the updatedTrip array
    // for each dynamically add an article into the carousel container
    // update: destination, status, date(s), img/alt, message, and cost
      // <article class="trip-card">
      //   <div class="info-image-container">
      //     <div class="destination-status-date-container">
      //       <h3>Destination</h3>
      //       <p>Status</p>
      //       <p>Dates</p>
      //     </div>
      //     <img class="trip-image" src="./images/traveling-icon.png" alt="plane over world icon">
      //   </div>
      //   <div class="message-cost-container">
      //     <p>Get ready <span>'switch statement response.'</span></p>
      //     <p class="est-cost">Estimated Trip Cost: <span>'$ amount'</span>; add-on agent fee: <span>'$ amount'</span></p>
      //   </div>
      // </article>
  }
};

export default domUpdates;
