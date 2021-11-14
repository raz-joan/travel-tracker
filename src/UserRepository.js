import Trip from './Trip';

class UserRepository {
  constructor(user, tripData, destinationData) {
    this.user = user;
    this.trips = tripData;
    this.destinations = destinationData;
    this.message = '';
    this.totalYearCost = 0;
    this.updatedTrips = [];
  }

  determineMessage() {
    const expr = this.user.travelerType;
    switch (expr) {
    case 'foodie':
      this.message = ' to eat some amazing dishes!';
      break;
    case 'thrill-seeker':
      this.message = ' for heart-racing adventure!';
      break;
    case 'photographer':
      this.message = ' to capture some amazing views!';
      break;
    case 'relaxer':
      this.message = ' for a relaxing time.';
      break;
    case 'shopper':
      this.message = ' for some unique souvenirs!';
      break;
    case 'history buff':
      this.message = ' to learn some interesting new things!';
      break;
    default:
      this.message = ' for your BEST vacation!';
      break;
    }
    // return this.message;
  }

  createTrips() {
    this.trips.forEach((trip) => {
      if (trip.userID === this.user.id) {
        let newTrip = new Trip(trip, this.destinations);
        this.updatedTrips.push(newTrip);
      }
    });
  }

  calculateTotalYearCost() {
    this.totalYearCost = this.updatedTrips.reduce((total, trip) => {
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
