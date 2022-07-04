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
///////
function startData(city) {
  let apiKey = `e545aeed06ed7e6ec4ac2e056f514d15`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
startData("Kyiv");
///////
function showForecast() {
  let currentForecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="card">
      <div class="card-body">
        <img
          src="http://openweathermap.org/img/wn/10d@2x.png"
          class="icon"
          alt="icon"
        />
        23°C <br />
        ${day}
      </div>
    </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  currentForecast.innerHTML = forecastHTML;
}
//////
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
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
////////
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  startData(city);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submit);

///////////

showForecast();
