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
    // return this.message;
  }

  createTrips() {
    this.trips.forEach((trip) => {
      if (trip.userID === this.user.id) {
        let newTrip = new Trip(trip, this.destinations);
        this.updatedTrips.push(newTrip);
        // console.log(newTrip.date); // NEED TO REMOVE THIS CHECK
      }
    });
    this.updatedTrips.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    // console.log(this.updatedTrips); // NEED TO REMOVE THIS
  }

  calculateTotalYearCost() {
    this.totalYearCost = this.updatedTrips.reduce((total, trip) => {
      if (new Date(trip.date) >= new Date("2021/01/01")) { // added conditional if for just this year ... ????
        trip.calculateEstCost();
        trip.calculateAgentPercent();
        trip.calculateTotalCost();
        total += trip.totalCost;
      }
      return total;
    }, 0);
    // return this.totalYearCost;
  }

  calculateAllTimeCost() {
    this.totalAllTimeCost = this.updatedTrips.reduce((total, trip) => {
      trip.calculateEstCost();
      trip.calculateAgentPercent();
      trip.calculateTotalCost();
      total += trip.totalCost;
      return total;
    }, 0);
    // return this.totalYearCost;
  }
}

export default UserRepository;
