import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip';
import { destinationTestData, tripTestData } from '../test/sampleData-test';

describe('Trip', () => {

  let trip1, trip2, trip3;
  beforeEach(() => {
    trip1 = new Trip(tripTestData[0], destinationTestData);
    trip2 = new Trip(tripTestData[1], destinationTestData);
    trip3 = new Trip(tripTestData[2], destinationTestData);
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
    expect(trip2).to.be.an.instanceOf(Trip);
    expect(trip3).to.be.an.instanceOf(Trip);
  });

  it('should store a trip id from the trip object argument', () => {
    expect(trip1.id).to.equal(1);
    expect(trip2.id).to.equal(2);
    expect(trip3.id).to.equal(3);
  });

  it('should store a trip status from the trip object argument', () => {
    expect(trip1.status).to.equal('approved');
    expect(trip2.status).to.equal('approved');
    expect(trip3.status).to.equal('pending');
  });

  it('should store a trip start date from the trip object argument', () => {
    expect(trip1.date).to.equal("2019/10/22");
    expect(trip2.date).to.equal("2020/02/03");
    expect(trip3.date).to.equal("2022/07/17");
  });

  it('should store a trip duration from the trip object argument', () => {
    expect(trip1.duration).to.equal(7);
    expect(trip2.duration).to.equal(14);
    expect(trip3.duration).to.equal(5);
  });

  it('should store number of travelers from the trip object argument', () => {
    expect(trip1.travelers).to.equal(3);
    expect(trip2.travelers).to.equal(2);
    expect(trip3.travelers).to.equal(1);
  });

  it('should store a destination from the destination array', () => {
    expect(trip1.destination).to.equal("Lima, Peru");
    expect(trip2.destination).to.equal("Sydney, Austrailia");
    expect(trip3.destination).to.equal("Stockholm, Sweden");
  });

  it('should store an image from the destination array', () => {
    expect(trip1.img).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
    expect(trip2.img).to.equal("https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
    expect(trip3.img).to.equal("https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  });

  it('should store an alt from the destination array', () => {
    expect(trip1.alt).to.equal("overview of city buildings with a clear sky");
    expect(trip2.alt).to.equal("opera house and city buildings on the water with boats");
    expect(trip3.alt).to.equal("city with boats on the water during the day time");
  });

  it('should store an estimated loding cost per day from the destination array', () => {
    expect(trip1.estimatedLodgingCostPerDay).to.equal(70);
    expect(trip2.estimatedLodgingCostPerDay).to.equal(130);
    expect(trip3.estimatedLodgingCostPerDay).to.equal(100);
  });

  it('should store an estimated flight cost per traveler from the destination array', () => {
    expect(trip1.estimatedFlightCostPerPerson).to.equal(400);
    expect(trip2.estimatedFlightCostPerPerson).to.equal(950);
    expect(trip3.estimatedFlightCostPerPerson).to.equal(780);
  });

  it('should store a default estimated cost of 0', () => {
    expect(trip1.estCost).to.equal(0);
    expect(trip2.estCost).to.equal(0);
    expect(trip3.estCost).to.equal(0);
  });

  it('should store a default agent percent of 0', () => {
    expect(trip1.agentPercent).to.equal(0);
    expect(trip2.agentPercent).to.equal(0);
    expect(trip3.agentPercent).to.equal(0);
  });

  it('should store a default total cost of 0', () => {
    expect(trip1.totalCost).to.equal(0);
    expect(trip2.totalCost).to.equal(0);
    expect(trip3.totalCost).to.equal(0);
  });

  it('should be able to calculate and update the estimated cost', () => {
    trip1.calculateEstCost();
    trip2.calculateEstCost();
    trip3.calculateEstCost();
    expect(trip1.estCost).to.equal(1690);
    expect(trip2.estCost).to.equal(3720);
    expect(trip3.estCost).to.equal(1280);
  });

  it('should be able to calculate and update the agent percent', () => {
    trip1.calculateEstCost();
    trip2.calculateEstCost();
    trip3.calculateEstCost();
    trip1.calculateAgentPercent();
    trip2.calculateAgentPercent();
    trip3.calculateAgentPercent();
    expect(trip1.agentPercent).to.equal(169);
    expect(trip2.agentPercent).to.equal(372);
    expect(trip3.agentPercent).to.equal(128);
  });

  it('should be able to calculate and update the total cost', () => {
    trip1.calculateEstCost();
    trip2.calculateEstCost();
    trip3.calculateEstCost();
    trip1.calculateAgentPercent();
    trip2.calculateAgentPercent();
    trip3.calculateAgentPercent();
    trip1.calculateTotalCost();
    trip2.calculateTotalCost();
    trip3.calculateTotalCost();
    expect(trip1.totalCost).to.equal(1859);
    expect(trip2.totalCost).to.equal(4092);
    expect(trip3.totalCost).to.equal(1408);
  });

});
