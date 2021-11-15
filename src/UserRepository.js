import Trip from './Trip';

class UserRepository {
  constructor(user, tripData, destinationData) {
    this.user = user;
    this.trips = tripData;
    this.destinations = destinationData;
    this.message = '';
    this.totalYearCost = 0;
    this.totalAllTimeCost = 0;
    this.updatedTrips = [];
  }

  determineMessage() {
    const expr = this.user.travelerType;
    switch (expr) {
    case 'foodie':
      this.message = 'some amazing dishes!';
      break;
    case 'thrill-seeker':
      this.message = 'heart-racing adventure!';
      break;
    case 'photographer':
      this.message = 'some amazing views!';
      break;
    case 'relaxer':
      this.message = 'relaxing experiences.';
      break;
    case 'shopper':
      this.message = 'some unique souvenirs!';
      break;
    case 'history buff':
      this.message = 'learning interesting new things!';
      break;
    default:
      this.message = 'awesome memories!';
      break;
    }
  }

  createTrips() {
    this.trips.forEach((trip) => {
      if (trip.userID === this.user.id) {
        let newTrip = new Trip(trip, this.destinations);
        this.updatedTrips.push(newTrip);
      }
    });
    this.updatedTrips.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  calculateTotalYearCost() {
    this.totalYearCost = this.updatedTrips.reduce((total, trip) => {
      if (new Date("2021/01/01") <= new Date(trip.date) && new Date(trip.date) < new Date("2022/01/01")) {
        trip.calculateEstCost();
        trip.calculateAgentPercent();
        trip.calculateTotalCost();
        total += trip.totalCost;
      }
      return total;
    }, 0);
  }

  calculateAllTimeCost() {
    this.totalAllTimeCost = this.updatedTrips.reduce((total, trip) => {
      trip.calculateEstCost();
      trip.calculateAgentPercent();
      trip.calculateTotalCost();
      total += trip.totalCost;
      return total;
    }, 0);
  }
}

export default UserRepository;
