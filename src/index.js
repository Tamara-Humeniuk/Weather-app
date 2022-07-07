function getmydate(date) {
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let cDay = days[date.getDay()];
  let cDate = date.getDate();
  let cHour = date.getHours();
  if (cHour < 10) {
    cHour = `0${cHour}`;
  }
  let cMinute = date.getMinutes();
  if (cMinute < 10) {
    cMinute = `0${cMinute}`;
  }
  return `${cDay} ${cDate}, ${cHour}:${cMinute}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = getmydate(currentTime);
///////////////////////////////////////////
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  return days[day];
}
/////////////////////////////////////
function showForecast(response) {
  let forecast = response.data.daily;
  let currentForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="card">
      <div class="card-body"${index}>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          class="icon"
          alt="icon"
        />
        ${Math.round(forecastDay.temp.day)}°C <br />
        ${formatDay(forecastDay.dt)}
        
      </div>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  currentForecast.innerHTML = forecastHTML;
}
////////////////////////////////////
function getForecast(coordinates) {
  let apiKey = `2889aed1023dca67262f9f447b36e26a`;
  let ipaUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(ipaUrl).then(showForecast);
}
///////////////////////////////////
function showWeather(response) {
  let icon = document.querySelector("#main-icon");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(`#current-temperature`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#general-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
//////////////////////////////////
function startData(city) {
  let apiKey = `2889aed1023dca67262f9f447b36e26a`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
//////////////////////////////////
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  startData(city);
}
//////////////////////////////////
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submit);

startData("Kyiv");
