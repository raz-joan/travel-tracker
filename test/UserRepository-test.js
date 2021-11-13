import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/Trip';
import UserRepository from '../src/UserRepository';
import { userTestData, destinationTestData, tripTestData } from '../test/sampleData-test';

describe('UserRepository', () => {

  let trip1, trip2, trip3, userRepo;
  beforeEach(() => {
    trip1 = new Trip(tripTestData[0], destinationTestData);
    trip2 = new Trip(tripTestData[1], destinationTestData);
    trip3 = new Trip(tripTestData[2], destinationTestData);
    userRepo = new UserRepository(userTestData, tripTestData, destinationTestData)
  });

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it('should store the user object', () => {
    expect(userRepo.user).to.deep.equal(userTestData);
  });

  it('should store the fetched trips array filtered for this user ID', () => {
    expect(userRepo.trips).to.deep.equal(tripTestData);
  });

  it('should store the fetched destinations array', () => {
    expect(userRepo.destinations).to.deep.equal(destinationTestData);
  });

  it('should store a default message of ""', () => {
    expect(userRepo.message).to.equal('');
  });

  it('should store a default yearly total cost of 0', () => {
    expect(userRepo.totalYearCost).to.equal(0);
  });

  it('should store an updated trips array that is default empty', () => {
    expect(userRepo.updatedTrips).to.deep.equal([]);
  });

  it('should determine and store an updated message', () => {
    userRepo.determineMessage();
    expect(userRepo.message).to.equal(' for a relaxing time.');
  });

  it('should be able to create new Trip instances', () => {
    userRepo.createTrips();
    expect(userRepo.updatedTrips).to.deep.equal([trip1, trip2, trip3]);
  });

  it('should calculate and update the total yearly cost', () => {
    userRepo.createTrips();
    userRepo.calculateTotalYearCost();
    expect(userRepo.totalYearCost).to.equal(7359);
  });
});
