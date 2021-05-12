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
    document.getElementById("display-city").innerHTML = response.name;
    document.getElementById("display-date").innerHTML = `${(m.format('LL'))}`;
    document.getElementById("display-main-temp").innerHTML = (`${Math.round(response.main.temp)}°`);
    document.getElementById("display-description").innerHTML = response.weather[0].description;
    document.getElementById("display-humidity").innerHTML = `Humidity: ${response.main.humidity} %`;
    document.getElementById("display-wind").innerHTML = `Wind: ${response.wind.speed} km/h`;

    // DOM ELEMENTS MANIPULATION (CHANGE THE SRC OF WEATHER-ICON DIV)
    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

    // ONECALL API SHOWS DAILY INFO (HERE I TACKLE THE 5 DAY REPORT I WAS STRUGGELING WITH)
    let lon = response.coord.lon;
    let lat = response.coord.lat;
    const forecastData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d8d527c15354bfe5906040af032fc58a&units=metric&exclude={current,minutely,hourly,alerts}`);
    const res = await forecastData.json();

    // DOM MANIPULATION PART 2 (5 DAY REPORT)
    let forecastElement = document.querySelector("#five-day-forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    // CREATED A FOR LOOP TO LOOP THROUGH DAILY INFO IN THE ONE CALL API (2nd)
    // 1 TO 6 BECAUSE 5 DAYS (WITHOUT FIRST ARRAY(0) CAUSE THATS ALREADY SHOW)
    for (let index = 1; index < 6; index++) {
        forecast = res.daily[index];
        let date = new Date(forecast.dt * 1000);
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friyay', 'Saturday'];
        let name = days[date.getDay()];

        // CHANGING THE INNERHTML OF EACH ELEMENT (DAILY)
        forecastElement.innerHTML += // += ADDITION ASSIGNMENT, WILL CREATE THE DIV FOR THE 5 COMING DAYS
            `<div id="single-day">
            <span class="hourly-forecast-name">${name}</span>
            <span class="hourly-forecast-temperature"> ${Math.round(forecast.temp.day)}°C</span>
            </div>`;
    }

    let backgroundImage = chooseImage();
    document.body.style.background = (`linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(236, 110, 76, 0.73)), url('${backgroundImage}')`);

    //linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73))
    
    function chooseImage() {

        if (response.weather[0].description === ('clear sky')) {
            return 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg'
        }
        if (response.weather[0].description=== ('few clouds')) {
            return 'https://thumbs.dreamstime.com/b/rain-water-drops-blue-27997826.jpg'
        }
        if (response.weather[0].description === ('scattered clouds')) {
            return 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg'
        }
        if (response.weather[0].description === ('broken clouds')) {
            return 'https://thumbs.dreamstime.com/b/rain-water-drops-blue-27997826.jpg'
        }
        if (response.weather[0].description === ('shower rain')) {
            return 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg'
        }
        if (response.weather[0].description === ('rain')) {
            return 'https://thumbs.dreamstime.com/b/rain-water-drops-blue-27997826.jpg'
        }
        if (response.weather[0].description === ('light rain')) {
            return 'https://thumbs.dreamstime.com/b/rain-water-drops-blue-27997826.jpg'
        }
        if (response.weather[0].description === ('thunderstorm')) {
            return 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg'
        }
        if (response.weather[0].description === ('snow')) {
            return 'https://thumbs.dreamstime.com/b/rain-water-drops-blue-27997826.jpg'
        }
        if (response.weather[0].description === ('mist')) {
            return 'https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg'
        } else {
            return 'https://cdn.britannica.com/88/144988-050-9DFB235C/Black-Rock-Desert-Nevada.jpg'
        }
    }

}

// CALLING THE FUNCTION WITH DEFAULT CITY ROSWELL
getCity('Roswell')

button.addEventListener('click', () => getCity(input.value));