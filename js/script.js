// API URL - d8d527c15354bfe5906040af032fc58a
// Added &units=metric to the url because the temp needs to be converted to °C

// Wrote a function so you can search on cityname (in the console)
// Used string interpolation 

function GetForecast(cityName) {

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d8d527c15354bfe5906040af032fc58a&units=metric`;

  // Fetching the Forecast for one particular city, in this case London
  // const url = 'http://api.openweathermap.org/data/2.5/forecast?q={London}&appid=d8d527c15354bfe5906040af032fc58a&units=metric';

  // Make a request for a user with a given ID
  axios.get(url)

    .then(function (response) {
      // handle success
      // console.log(response.data);
      // console.log(response.data.list[0].main.temp);

      // Showing the temp of current day on the screen
      document.getElementById('target').innerHTML = `It is now ${response.data.list[0].main.temp}°C in ${cityName}`;

    })

    .catch(function (error) {
      // handle error
      document.getElementById('target').innerHTML = ('Please make sure the city is spelled correctly.');
      console.log(error);
    })

}

window.onload = function () {
  document.getElementById('sendButton').onclick = function () {

    // Getting the city from the input
    const cityName = document.getElementById('cityTextInput').value;

    // Calling the getForecast function
    GetForecast(cityName);

  }

}