// API URL - 470f22cc8a2f35fbc5b2273fa0d779e6
const url = 'http://api.openweathermap.org/data/2.5/forecast?q=London&appid=470f22cc8a2f35fbc5b2273fa0d779e6';

// Make a request for a user with a given ID
axios.get(url)

  .then(function (response) {
    // handle success
    console.log(response);
  })

  .catch(function (error) {
    // handle error
    console.log(error);
  })

  .then(function () {
      console.log('Done');
    // always executed
  });


