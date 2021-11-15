import errorHandling from "./error-handling.js";

let apiCalls = {

  getData(dataUrl, dataObjName) {
    const retrievedData = fetch(dataUrl)
      .then(res => {
        errorHandling.checkStatus(res, `There was an error connecting to ${dataUrl}.`);
        return res.json();
      })
      .then(data => data[dataObjName])
      .catch(err => {
        if (err.message === "Failed to fetch") {
          errorHandling.connectionErr(err, "Couldn't connect to database.");
        } else {
          errorHandling.connectionErr(err);
        }
      });
    return retrievedData;
  },

  getAllData() {
    const fetchedUsers = this.getData('http://localhost:3001/api/v1/travelers', 'travelers');
    const fetchedTrips = this.getData('http://localhost:3001/api/v1/trips', 'trips');
    const fetchedDestinations = this.getData('http://localhost:3001/api/v1/destinations', 'destinations');
    const allPromise = Promise.all([fetchedUsers, fetchedTrips, fetchedDestinations])
      .then(data => data);
    return allPromise;
  },

  postData(url, newData) {
    const postedData = fetch(url, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      errorHandling.checkStatus(response);
      return response.json();
    })
    .catch(err => errorHandling.connectionErr(err));
    return postedData;
  }
};

export default apiCalls;
