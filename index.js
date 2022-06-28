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
function showWeather(response) {
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
}
////////
function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  startData(city);
}
///////////
function searchLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `e545aeed06ed7e6ec4ac2e056f514d15`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}
//////
function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocationWeather);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", submit);
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", findLocation);

///////////
