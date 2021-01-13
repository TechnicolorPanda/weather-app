/* eslint-disable import/no-cycle */
import { displayWeather } from './home';
import { changeTempUnits } from './temperature';

// creates a class for weather information used

class Weather {
  constructor(
    city,
    temperature,
    feelsLike,
    tempMax,
    tempMin,
    humidityPercent,
    report,
    iconInfo,
  ) {
    this.city = city;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.humidityPercent = humidityPercent;
    this.report = report;
    this.iconInfo = iconInfo;
  }
}

// place weather information for selected city within the Weather class

function gatherData(weatherInformation) {
  // sorts weather information into used categories

  const city = weatherInformation.name;
  const temperature = weatherInformation.main.temp;
  const feelsLike = weatherInformation.main.feels_like;
  const tempMax = weatherInformation.main.temp_max;
  const tempMin = weatherInformation.main.temp_min;
  const humidityPercent = weatherInformation.main.humidity;
  const report = weatherInformation.weather[0].description;
  const iconInfo = weatherInformation.weather[0].icon;

  const weatherData = new Weather(
    city,
    temperature,
    feelsLike,
    tempMax,
    tempMin,
    humidityPercent,
    report,
    iconInfo,
  );
  changeTempUnits(weatherData);

  // identifies units selected on toggle and displays by units

  const units = document.getElementById('check').checked;
  displayWeather(weatherData, units);
}

// handles errors in retrieving weather data

function errorResult() {
  const displayBox = document.getElementById('info');
  const displayError = document.createElement('h4');
  displayError.innerHTML = 'Weather data is unable to be displayed. Please try again.';
  displayBox.appendChild(displayError);
}

// clears page to enable rendering of new data

function resetPage() {
  const displayBox = document.getElementById('info');
  displayBox.innerHTML = '';
}

// retrieve weather data from openweather.com

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},&APPID=5287f004be1ee460907a8a4c96152f64`, {
      mode: 'cors',
    });
    const weatherInformation = await response.json();
    gatherData(weatherInformation);
  } catch (err) {
    errorResult();
  }
}

// error directs user to input valid city name

function submitError() {
  resetPage();
  const displayBox = document.getElementById('info');
  const displayError = document.createElement('h4');
  displayError.innerHTML = 'Please enter a valid city name. Do not enter state, country, or zip code.';
  displayBox.appendChild(displayError);
}

// changes city for which to retrieve weather information

function changeCity() {
  const city = document.getElementById('search').value;
  resetPage();
  getWeather(city);
}

// displays error upon failing test for correct input of city name

function cityError(cityTest) {
  if (cityTest) {
    changeCity();
  } else {
    submitError();
  }
}

// validates correct city name input

function validateCity() {
  const cityInput = document.getElementById('search').value;
  if (cityInput.length >= 2 && cityInput.length <= 74) {
    const validCity = (/^[a-zA-Z.&' _`-]*$/);
    const cityTest = validCity.test(cityInput);
    cityError(cityTest);
  } else {
    submitError();
  }
}

// submits new city name

function selectSubmit() {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', () => {
    const submit = true;
    validateCity(submit);
  });
}

// initial loading of data

function loadWeather() {
  const city = 'Grand Rapids';
  selectSubmit();
  getWeather(city);
}

export { loadWeather, errorResult, resetPage };
