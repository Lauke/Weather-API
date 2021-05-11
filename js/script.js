// API URL - d8d527c15354bfe5906040af032fc58a
// Added &units=metric to the url because the temp needs to be converted to °C

// Wrote a function so you can search on cityname (in the console)
// Used string interpolation 

function GetForecast(cityName) {

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=d8d527c15354bfe5906040af032fc58a&units=metric`;

  // Make a request for a user with a given ID
  axios.get(url)
    .then(function (response) {
      // const dailyForecast = response.data.list;
      // console.log(cityName, dailyForecast);
      
      // CREATING A FOR LOOP FOR A 5 DAY FORECAST
      let container = document.getElementById('container');

      for (let i = 0; i < response.data.list.length; i += 8) {
        
        let icon = response.data.list[i].weather[0].icon
        let img = document.createElement('img')
        let h2 = document.createElement("h2");
        let h3 = document.createElement("h3");
        let h4 = document.createElement("h4");
        let divCard = document.createElement("div");
        divCard.classList.add('col-sm-2', 'day');

        // REFORMATTING THE DATE TO A DAY WITH MOMENT.JS
        const m = moment (response.data.list[i].dt_txt);
        
        // CREATING THE HTML PART 2
        let displayDescription = document.createTextNode(response.data.list[i].weather[0].description);
        let displayDay = document.createTextNode(m.format('dddd'));
        let displayTemp = document.createTextNode(Math.round(response.data.list[i].main.temp));

        img.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`)
        h2.appendChild(displayDescription);
        h3.appendChild(displayDay);
        h4.appendChild(displayTemp);

        divCard.appendChild(img);
        divCard.appendChild(h2);
        divCard.appendChild(h3);
        divCard.appendChild(h4);

        document.querySelector('.row').appendChild(divCard); 

      }

      // Showing the temp of current day on the screen
      // document.getElementById('target').innerHTML = `It is now ${response.data.list[0].main.temp}°C in ${cityName}`;
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