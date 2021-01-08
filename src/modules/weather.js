// import { displayWeather } from './modules/display';

function loadWeather() {
  console.log('load weather');
  const city = 'Grand Rapids';
  getWeather(city);
}

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
    category,
    iconInfo,
    windDirection,
    windSpeed,
  ) {
    this.city = city;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.humidityPercent = humidityPercent;
    this.report = report;
    this.category = category;
    this.iconInfo = iconInfo;
    this.windDirection = windDirection;
    this.windSpeed = windSpeed;
  }
}

function gatherData(weatherInformation) {
  console.log('gather data');
  const city = weatherInformation.name;
  const temperature = weatherInformation.main.temp;
  const feelsLike = weatherInformation.main.feels_like;
  const tempMax = weatherInformation.main.temp_max;
  const tempMin = weatherInformation.main.temp_min;
  const humidityPercent = weatherInformation.main.humidity;
  const report = weatherInformation.weather[0].description;
  const category = weatherInformation.weather[0].main;
  const iconInfo = weatherInformation.weather[0].icon;

  // const windDirection = weatherInformation.wind[deg];
  // const windSpeed = weatherInformation.wind.speed;

  const weatherData = new Weather(
    city,
    temperature,
    feelsLike,
    tempMax,
    tempMin,
    humidityPercent,
    report,
    category,
    iconInfo,
    // windDirection,
    // windSpeed,
  );
  // console.log(`wind ${windDirection}`);
  console.log(weatherData);
  displayWeather(weatherData);
}

function displayWeather(weatherData) {
  console.log('display weather');
  displayCity(weatherData);
  changeCity();
  displayTemperature(weatherData);
  displayFeelsLike(weatherData);
  displayTempMax(weatherData);
  displayTempMin(weatherData);
  displayHumidity(weatherData);
  displayReport(weatherData);
  displayCategory(weatherData);
  displayIcon(weatherData);
}

function displayCity(weatherData) {
  const displayBox = document.getElementById('content');
  const cityName = document.createElement('h1');
  cityName.innerHTML = weatherData.city;
  displayBox.appendChild(cityName);
}

function changeCity() {
// TO: add input section to change city, add validation
}

function displayTemperature(weatherData) {
  const displayBox = document.getElementById('content');
  const displayTemp = document.createElement('h2');
  const tempInK = weatherData.temperature;
  const currentTemperature = temperatureInF(tempInK);
  displayTemp.innerHTML = `${currentTemperature}\u{00B0}F`;
  displayBox.appendChild(displayTemp);
}

function displayFeelsLike(weatherData) {
  const displayBox = document.getElementById('content');
  const displayFeels = document.createElement('h3');
  const tempInK = weatherData.feelsLike;
  const feelsLikeTemperature = temperatureInF(tempInK);
  displayFeels.innerHTML = `Feels like ${feelsLikeTemperature}\u{00B0}F`;
  displayBox.appendChild(displayFeels);
}

function displayTempMax(weatherData) {
  const displayBox = document.getElementById('content');
  const displayMax = document.createElement('h3');
  const tempInK = weatherData.tempMax;
  const maxTemp = temperatureInF(tempInK);
  displayMax.innerHTML = `High ${maxTemp}\u{00B0}F`;
  displayBox.appendChild(displayMax);
}

function displayTempMin(weatherData) {
  const displayBox = document.getElementById('content');
  const displayMin = document.createElement('h3');
  const tempInK = weatherData.tempMin;
  const minTemp = temperatureInF(tempInK);
  displayMin.innerHTML = `Low ${minTemp}\u{00B0}F`;
  displayBox.appendChild(displayMin);
}

function displayHumidity(weatherData) {
  const displayBox = document.getElementById('content');
  const displayHumid = document.createElement('h3');
  const humidity = weatherData.humidityPercent;
  displayHumid.innerHTML = `Humidity ${humidity}%`;
  displayBox.appendChild(displayHumid);
}

function displayReport(weatherData) {
  const displayBox = document.getElementById('content');
  const displayDescription = document.createElement('h3');
  const reportInfo = weatherData.report;
  displayDescription.innerHTML = `${reportInfo}`;
  displayBox.appendChild(displayDescription);
}

function displayCategory(weatherData) {
  const displayBox = document.getElementById('content');
  const writeCategory = document.createElement('h3');
  const categoryInfo = weatherData.category;
  writeCategory.innerHTML = `${categoryInfo}`;
  displayBox.appendChild(writeCategory);
}

// TODO: fix icon displaying on page

async function displayIcon(weatherData) {
  const img = document.querySelector('img');
  const iconNumber = weatherData.iconInfo;
  try {
    const response = await fetch(`https://openweathermap.org/img/wn/${iconNumber}@2x.png`, {
      mode: 'cors',
    });
    console.log(response);
    const iconData = await response.json();
    img.src = iconData.data.images.original.url;
  } catch (err) {
    errorResult();
  }
}

// converts temperature from Kelvin to Farenheit

function temperatureInF(tempInK) {
  const tempInF = (tempInK - 273.15) * (9 / 5) + 32;
  return Math.round(tempInF);
}

// converts temperature from Kelvin to Celcius

function temperatureInC(weatherData) {
  const tempInK = weatherData.temperature;
  const tempInC = (tempInK - 273.15);
  return Math.round(tempInC);
}

function errorResult() {
  console.log('error in retrieving weather');
}

export { loadWeather };
