// DECLARING THE INPUT
const input = document.getElementById('get-city');
const button = document.getElementById('btn-run');

// FETCHING THE FIRST API FOR TODAY'S INFO
const getCity = async city => {
    const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d8d527c15354bfe5906040af032fc58a&units=metric`);
    const response = await url.json();

    // TRANSLATING THE UNIX TIMESTAMP TO A READABLE FORMAT
    const m = moment(response.dt * 1000)

    // DOM ELEMENTS MANIPULATION
    document.getElementById('display-city').innerHTML = response.name;
    document.getElementById('display-date').innerHTML = `${(m.format('LL'))}`;
    document.getElementById('display-main-temp').innerHTML = (`${Math.round(response.main.temp)}°`);
    document.getElementById('display-description').innerHTML = response.weather[0].description;
    document.getElementById('display-humidity').innerHTML = `Humidity: ${response.main.humidity} %`;
    document.getElementById('display-wind').innerHTML = `Wind: ${response.wind.speed} km/h`;

    // DOM ELEMENTS MANIPULATION (CHANGE THE SRC OF WEATHER-ICON DIV)
    let weatherIcon = document.querySelector('#weather-icon');
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

    // ONECALL API SHOWS DAILY INFO (HERE I TACKLE THE 5 DAY REPORT I WAS STRUGGELING WITH)
    let lon = response.coord.lon;
    let lat = response.coord.lat;
    const forecastData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d8d527c15354bfe5906040af032fc58a&units=metric&exclude={current,minutely,hourly,alerts}`);
    const res = await forecastData.json();

    // DOM MANIPULATION PART 2 (5 DAY REPORT)
    let forecastElement = document.querySelector('#five-day-forecast');
    forecastElement.innerHTML = null;
    let forecast = null;

    // CREATED A FOR LOOP, TO LOOP THROUGH DAILY INFO IN THE ONE CALL API (2nd)
    // 1 TO 6 BECAUSE 5 DAYS (WITHOUT FIRST ARRAY(0) CAUSE THATS ALREADY SHOW)
    for (let index = 1; index < 6; index++) {
        forecast = res.daily[index];
        let date = new Date(forecast.dt * 1000);
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friyay', 'Saturday'];
        let name = days[date.getDay()];

        // CHANGING THE INNERHTML OF EACH ELEMENT (DAILY)
        forecastElement.innerHTML += // += ADDITION ASSIGNMENT, WILL CREATE THE DIV FOR THE 5 COMING DAYS
            `<div id='single-day'>
            <span class='hourly-forecast-name'>${name}</span>
            <span class='hourly-forecast-temperature'> ${Math.round(forecast.temp.day)}°C</span>
            </div>`;
    }

/*     let backgroundImage = chooseImage();
    document.body.style.background = (`linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(236, 110, 76, 0.73)), url('${backgroundImage}')`);
    
    function chooseImage() {

        if (response.weather[0].description === ('clear sky')) {
            return 'img/clear.jpg'
        }
        if (response.weather[0].description=== ('few clouds')) {
            return 'img/few.jpg'
        }
        if (response.weather[0].description === ('overcast clouds')) {
            return 'img/overcast.jpg'
        }
        if (response.weather[0].description === ('scattered clouds')) {
            return 'img/scattered.jpg'
        }
        if (response.weather[0].description === ('broken clouds')) {
            return 'img/broken.jpg'
        }
        if (response.weather[0].description === ('shower rain')) {
            return 'img/heavy_rain.jpg'
        }
        if (response.weather[0].description === ('rain')) {
            return 'img/rain.jpg'
        }
        if (response.weather[0].description === ('light rain')) {
            return 'img/light_rain.jpg'
        }
        if (response.weather[0].description === ('thunderstorm')) {
            return 'img/thunderstorm.jpg'
        }
        if (response.weather[0].description === ('snow')) {
            return 'img/snow.jpg'
        }
        if (response.weather[0].description === ('mist')) {
            return 'img/mist.jpeg'
        } else {
            return 'img/default.jpg'
        }
    } */

    // FETCHING THE UNSPLASH API, ADDED THE CITY AS VALUE FOR THE QUERY (DEFINED EARLIER)
    const randomImage = await fetch(`https://api.unsplash.com/search/photos?query=${city}-nature&client_id=Lgfa96r1w4FjuxvOUFRM-Ya4wz-BQQArBLMN6YwDlaU`);
    const imageRes = await randomImage.json();
    
    // FETCHING THE IMAGE URL IN THE API AND DEFINING THEM AS IMAGE
    // CHANGING THE DOM AND ADDED THE DEFINED IMAGE IN THE URL
    let image = imageRes.results[0].urls.regular;
    document.body.style.background = 'linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(236, 110, 76, 0.73)), url('+image+')';
    
}

// CALLING THE FUNCTION WITH DEFAULT CITY MIAMI
getCity('Miami')

button.addEventListener('click', () => getCity(input.value));