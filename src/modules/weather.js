// import { displayWeather } from './modules/display';

function loadWeather() {
  console.log('load weather');
  const city = 'Grand Rapids';
  selectSubmit();
  getWeather(city);
}

// retrieve weather data from openweather.com

async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5287f004be1ee460907a8a4c96152f64`, {
      mode: 'cors',
    });
    const weatherInformation = await response.json();
    console.log(weatherInformation);
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
    // category,
    iconInfo,
  ) {
    this.city = city;
    this.temperature = temperature;
    this.feelsLike = feelsLike;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.humidityPercent = humidityPercent;
    this.report = report;
    // this.category = category;
    this.iconInfo = iconInfo;
  }
}

function gatherData(weatherInformation) {
  const city = weatherInformation.name;
  const temperature = weatherInformation.main.temp;
  const feelsLike = weatherInformation.main.feels_like;
  const tempMax = weatherInformation.main.temp_max;
  const tempMin = weatherInformation.main.temp_min;
  const humidityPercent = weatherInformation.main.humidity;
  const report = weatherInformation.weather[0].description;
  // const category = weatherInformation.weather[0].main;
  const iconInfo = weatherInformation.weather[0].icon;

  const weatherData = new Weather(
    city,
    temperature,
    feelsLike,
    tempMax,
    tempMin,
    humidityPercent,
    report,
    // category,
    iconInfo,
  );
  displayWeather(weatherData);
}

function displayWeather(weatherData) {
  console.log('display weather');
  displayCity(weatherData);
  displayTemperature(weatherData);
  displayFeelsLike(weatherData);
  displayTempMax(weatherData);
  displayTempMin(weatherData);
  displayHumidity(weatherData);
  displayReport(weatherData);
  // displayCategory(weatherData);
  displayIcon(weatherData);
}

function displayCity(weatherData) {
  const cityName = document.getElementById('cityName');
  cityName.innerHTML = weatherData.city;
}

function changeCity() {
  const city = document.getElementById('search').value;
  resetPage();
  getWeather(city);
}

function resetPage() {
  const displayBox = document.getElementById('info');
  displayBox.innerHTML = '';
}

function selectSubmit() {
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', () => {
    console.log('click');
    changeCity();
  });
}

function displayTemperature(weatherData) {
  const displayBox = document.getElementById('info');
  const displayTemp = document.createElement('h2');
  const tempInK = weatherData.temperature;
  const currentTemperature = temperatureInF(tempInK);
  displayTemp.innerHTML = `${currentTemperature}\u{00B0}F`;
  displayBox.appendChild(displayTemp);
}

function displayFeelsLike(weatherData) {
  const displayBox = document.getElementById('info');
  const displayFeels = document.createElement('h3');
  const tempInK = weatherData.feelsLike;
  const feelsLikeTemperature = temperatureInF(tempInK);
  displayFeels.innerHTML = `Feels like ${feelsLikeTemperature}\u{00B0}F`;
  displayBox.appendChild(displayFeels);
}

function displayTempMax(weatherData) {
  const displayBox = document.getElementById('info');
  const displayTemps = document.createElement('container');
  displayTemps.setAttribute('id', 'temp_box');
  const displayMax = document.createElement('h3');
  const tempInK = weatherData.tempMax;
  const maxTemp = temperatureInF(tempInK);
  displayMax.innerHTML = `High ${maxTemp}\u{00B0}F | `;
  displayTemps.appendChild(displayMax);
  displayBox.appendChild(displayTemps);
}

function displayTempMin(weatherData) {
  const displayBox = document.getElementById('temp_box');
  const displayMin = document.createElement('h3');
  const tempInK = weatherData.tempMin;
  const minTemp = temperatureInF(tempInK);
  displayMin.innerHTML = ` Low ${minTemp}\u{00B0}F`;
  displayBox.appendChild(displayMin);
}

function displayHumidity(weatherData) {
  const displayBox = document.getElementById('info');
  const displayHumid = document.createElement('h3');
  const humidity = weatherData.humidityPercent;
  displayHumid.innerHTML = `Humidity ${humidity}%`;
  displayBox.appendChild(displayHumid);
}

function displayReport(weatherData) {
  const displayBox = document.getElementById('info');
  const displayDescription = document.createElement('h3');
  const reportInfo = weatherData.report;
  displayDescription.innerHTML = `${reportInfo}`;
  displayBox.appendChild(displayDescription);
}

// function displayCategory(weatherData) {
//   const categoryInfo = weatherData.category;
//   console.log(categoryInfo);
//   if (categoryInfo === 'Clouds') {
//     console.log('clouds');
//     const style = document.createElement('style');
//     style.innerHTML = `
//           body{
//               background-image: url('images/cloudy.jpg');
//               background-repeat: no-repeat;
//               background-attachment: fixed;
//               background-size: cover;
//           }`;
//     document.head.appendChild(style);
//   } else if (categoryInfo === 'Clear') {
//     const style = document.createElement('style');
//     style.innerHTML = `
//           body{
//               background-image: url('images/clear.jpg');
//               background-repeat: no-repeat;
//               background-attachment: fixed;
//               background-size: cover;
//           }`;
//     document.head.appendChild(style);
//   }
// }

function setBackground(iconNumber) {
  const style = document.createElement('style');
  style.backgroundRepeat = 'no-repeat';
  style.backgroundAttachment = 'fixed';
  style.backgroundSize = 'cover';
  console.log(iconNumber);
  if ((iconNumber === '04n') || (iconNumber === '04d') || (iconNumber === '03n') || (iconNumber === '03d')) {
    style.innerHTML = `
          body{
              background-image: url('images/cloudy.jpg');
          }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '01d') || (iconNumber === '01n')) {
    style.innerHTML = `
          body{
              background-image: url('images/clear.jpeg');
          }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '02d') || (iconNumber === '02n')) {
    style.innerHTML = `
    body{
        background-image: url('images/partlycloudy.jpeg');
    }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '09n') || (iconNumber === '09d') || (iconNumber === '10n') || (iconNumber === '10d')) {
    style.innerHTML = `
    body{
        background-image: url('images/rainy.jpeg');
    }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '11n') || (iconNumber === '11d')) {
    style.innerHTML = `
    body{
        background-image: url('images/thunderstorm.jpg');
    }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '13n') || (iconNumber === '13d')) {
    style.innerHTML = `
    body{
        background-image: url('images/snow.jpg');
    }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '50n') || (iconNumber === '50d')) {
    style.innerHTML = `
    body{
        background-image: url('images/mist.jpg');
    }`;
    document.head.appendChild(style);
  }
}

async function displayIcon(weatherData) {
  console.log('display icon');
  const img = document.querySelector('img');
  const iconNumber = weatherData.iconInfo;
  setBackground(iconNumber);
  try {
    const iconData = await fetch(`https://openweathermap.org/img/wn/${iconNumber}@2x.png`, {
      mode: 'cors',
    });
    img.src = iconData.url;
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
