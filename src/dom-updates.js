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
};

export default domUpdates;
