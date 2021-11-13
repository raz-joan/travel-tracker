let apiCalls = {

  getData(dataUrl, dataObjName) {
    const retrievedData = fetch(dataUrl)
      .then(res => {
        // checkStatus(res, `There was an error connecting to ${dataUrl}.`)
        return res.json();
      })
      .then(data => data[dataObjName])
      .catch(err => {
        // if (err.message === "Failed to fetch") {
        //   connectionErr(err, "Couldn't connect to database.")
        // } else {
        //   connectionErr(err);
        // }
        console.log('error: ', err);
      });
    return retrievedData;
  },

  getAllData() {
    const gotUserData = this.getData('http://localhost:3001/api/v1/travelers/', 'travelers');
    const gotTripData = this.getData('http://localhost:3001/api/v1/trips	', 'trips');
    const gotDestinationData = this.getData('http://localhost:3001/api/v1/destinations	', 'destinations');
    const allPromise = Promise.all([gotUserData, gotTripData, gotDestinationData])
      .then(data => data);
  return allPromise;
  }

  // postData(url, newData) {
  //   const postedData = fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify(newData),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then(response => {
  //     checkStatus(response);
  //     return response.json();
  //   })
  //   .catch(err => connectionErr(err));
  //   return postedData;
  // };
}

export default apiCalls;
