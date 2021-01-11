import { displayWeather } from './home';
import { changeTempUnits } from './temperature';

// retrieve weather data from openweather.com

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5287f004be1ee460907a8a4c96152f64`, {
      mode: 'cors',
    });
    const weatherInformation = await response.json();
    gatherData(weatherInformation);
  } catch (err) {
    errorResult();
  }
}

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

function gatherData(weatherInformation, units) {
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
  displayWeather(weatherData, units);
}

// handles errors in retrieving weather data

function errorResult() {
  console.log('error in retrieving weather');
}

// changes city for which to retrieve weather information

function changeCity() {
  const city = document.getElementById('search').value;
  resetPage();
  getWeather(city);
}

// clears page to enable rendering of new data

function resetPage() {
  const displayBox = document.getElementById('info');
  displayBox.innerHTML = '';
}

// submits new city name

function selectSubmit() {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', () => {
    changeCity();
  });
}

// initial loading of data

function loadWeather() {
  const city = 'Grand Rapids';
  const units = true;
  selectSubmit();
  getWeather(city);
  changeTempUnits(units);
}

export { loadWeather, gatherData, errorResult };
