class Trip {
  constructor(trip, destinations) {
    this.id = trip.id;
    this.status = trip.status;
    this.date = trip.date;
    this.duration = trip.duration;
    this.travelers = trip.travelers;
    this.destination = destinations
      .find(entry => entry.id === trip.destinationID).destination;
    this.img = destinations.find(entry => entry.id === trip.destinationID).image;
    this.alt = destinations.find(entry => entry.id === trip.destinationID).alt;
    this.estimatedLodgingCostPerDay = destinations
      .find(entry => entry.id === trip.destinationID).estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinations
      .find(entry => entry.id === trip.destinationID).estimatedFlightCostPerPerson;
    this.estCost = 0;
    this.agentPercent = 0;
    this.totalCost = 0;
  }

  calculateEstCost() {
    this.estCost = (this.duration * this.estimatedLodgingCostPerDay)
      + (this.travelers * this.estimatedFlightCostPerPerson);
  }

  calculateAgentPercent() {
    this.agentPercent = this.estCost * 0.1;
  }

  calculateTotalCost() {
    this.totalCost = this.estCost + this.agentPercent;
  }
}

export default Trip;
