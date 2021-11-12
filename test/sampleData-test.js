const userTestData = {
  "id": 1,
  "name": "Ham Leadbeater",
  "travelerType": "relaxer"
};

const destinationTestData = [
  {
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "overview of city buildings with a clear sky"
    },
    {
    "id": 2,
    "destination": "Stockholm, Sweden",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 780,
    "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with boats on the water during the day time"
    },
    {
    "id": 3,
    "destination": "Sydney, Austrailia",
    "estimatedLodgingCostPerDay": 130,
    "estimatedFlightCostPerPerson": 950,
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "opera house and city buildings on the water with boats"
    },
    {
    "id": 4,
    "destination": "Cartagena, Colombia",
    "estimatedLodgingCostPerDay": 65,
    "estimatedFlightCostPerPerson": 350,
    "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "alt": "boats at a dock during the day time"
    },
    {
    "id": 5,
    "destination": "Madrid, Spain",
    "estimatedLodgingCostPerDay": 150,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with clear skys and a road in the day time"
    }
];

const tripTestData = [
  {
    "id": 1,
    "userID": 1,
    "destinationID": 5,
    "travelers": 3,
    "date": "2019/10/22",
    "duration": 7,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 2,
    "userID": 1,
    "destinationID": 3,
    "travelers": 3,
    "date": "2020/02/03",
    "duration": 14,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 3,
    "userID": 1,
    "destinationID": 2,
    "travelers": 1,
    "date": "2020/07/17",
    "duration": 5,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 4,
    "userID": 1,
    "destinationID": 1,
    "travelers": 2,
    "date": "2021/02/20",
    "duration": 18,
    "status": "approved",
    "suggestedActivities": []
  },
  {
    "id": 5,
    "userID": 1,
    "destinationID": 4,
    "travelers": 1,
    "date": "2022/09/16",
    "duration": 8,
    "status": "approved",
    "suggestedActivities": []
  }
];

export { userTestData, destinationTestData, tripTestData };
