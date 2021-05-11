// API URL - d8d527c15354bfe5906040af032fc58a
// Added &units=metric to the url because the temp needs to be converted to °C

// Wrote a function so you can search on cityname (in the console)
// Used string interpolation 

/* function GetForecast(cityName) {
 */
const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=d8d527c15354bfe5906040af032fc58a&units=metric&exclude=current,minutely,hourly,alerts`;

// Make a request for a user with a given ID
axios.get(url)
  .then(function (response) {

    //console.log(response)

    const today = new Date();
    const day = 60 * 60 * 24 * 1000;

    const dateBins = {};
    const nBins = 6; // there can be reports for up to 6 distinct dates

    for (let i = 0; i < nBins; i++) {

      // set up a bin (empty array) for each date
      
      const date = new Date(today.getTime() + i * day);
      dateBins[date.getDate()] = [];
    }

    const reports = response.data.list;
    for (const report of reports) {
      const reportDate = new Date(report.dt * 1000).getDate();
      dateBins[reportDate].push(report);
    }

    console.log(dateBins);
    
/* 
     for (let i = 0; i < response.data.list.length; i += 8) {
      let UnixTime = response.data.list[i].dt;
      let myDate = new Date(UnixTime * 1000).toLocaleDateString("en", {
        weekday: "long",
      });

      document.write(myDate)

    } */


  })

  .catch(function (error) {
    // handle error
    document.getElementById('target').innerHTML = ('Please make sure the city is spelled correctly.');
    console.log(error);
  })

/* } */

/* window.onload = function () {
  document.getElementById('sendButton').onclick = function () {
    // Getting the city from the input
    const cityName = document.getElementById('cityTextInput').value;
    // Calling the getForecast function
    GetForecast(cityName);
  }

} */