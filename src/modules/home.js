import { errorResult } from './weather';
import { changeTempUnits, temperatureInF } from './temperature';

// displays city name on page

function displayCity(weatherData) {
  const cityName = document.getElementById('cityName');
  cityName.innerHTML = weatherData.city;
}

// converts temperature from Kelvin to Farenheit

function displayTemperature(weatherData) {
  const displayBox = document.getElementById('info');
  const displayTemp = document.createElement('h2');
  const tempInK = weatherData.temperature;
  const currentTemperature = temperatureInF(tempInK);
  displayTemp.innerHTML = `${currentTemperature}\u{00B0}F`;
  displayBox.appendChild(displayTemp);
}

// displays temperature of feels like

function displayFeelsLike(weatherData) {
  const displayBox = document.getElementById('info');
  const displayFeels = document.createElement('h3');
  const tempInK = weatherData.feelsLike;
  const feelsLikeTemperature = temperatureInF(tempInK);
  displayFeels.innerHTML = `Feels like ${feelsLikeTemperature}\u{00B0}F`;
  displayBox.appendChild(displayFeels);
}

// displays the maximum temperature

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

// displays the minimum temperature

function displayTempMin(weatherData) {
  const displayBox = document.getElementById('temp_box');
  const displayMin = document.createElement('h3');
  const tempInK = weatherData.tempMin;
  const minTemp = temperatureInF(tempInK);
  displayMin.innerHTML = ` Low ${minTemp}\u{00B0}F`;
  displayBox.appendChild(displayMin);
}

// displays the minimum temperature

function displayHumidity(weatherData) {
  const displayBox = document.getElementById('info');
  const displayHumid = document.createElement('h3');
  const humidity = weatherData.humidityPercent;
  displayHumid.innerHTML = `Humidity ${humidity}%`;
  displayBox.appendChild(displayHumid);
}

// displays the weather description

function displayReport(weatherData) {
  const displayBox = document.getElementById('info');
  const displayDescription = document.createElement('h3');
  const reportInfo = weatherData.report;
  displayDescription.innerHTML = `${reportInfo}`;
  displayBox.appendChild(displayDescription);
}

// changes the background picture depending on the weather description by weather icon number

function setBackground(iconNumber) {
  const style = document.createElement('style');
  if ((iconNumber === '04n') || (iconNumber === '04d') || (iconNumber === '03n') || (iconNumber === '03d')) {
    style.innerHTML = `
            body{
                background-image: url('images/cloudy.jpg');
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-size: cover;
            }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '01d') || (iconNumber === '01n')) {
    style.innerHTML = `
            body{
                background-image: url('images/clear.jpeg');
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-size: cover;
            }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '02d') || (iconNumber === '02n')) {
    style.innerHTML = `
      body{
          background-image: url('images/partlycloudy.jpeg');
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-size: cover;
      }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '09n') || (iconNumber === '09d') || (iconNumber === '10n') || (iconNumber === '10d')) {
    style.innerHTML = `
      body{
          background-image: url('images/rainy.jpeg');
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-size: cover;
      }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '11n') || (iconNumber === '11d')) {
    style.innerHTML = `
      body{
          background-image: url('images/thunderstorm.jpg');
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-size: cover;
      }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '13n') || (iconNumber === '13d')) {
    style.innerHTML = `
      body{
          background-image: url('images/snow.jpg');
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-size: cover;
      }`;
    document.head.appendChild(style);
  } else if ((iconNumber === '50n') || (iconNumber === '50d')) {
    style.innerHTML = `
      body{
          background-image: url('images/mist.jpg');
          background-repeat: no-repeat;
          background-attachment: fixed;
          background-size: cover;
      }`;
    document.head.appendChild(style);
  }
}

// retrieves correct weather icon for forecast

async function displayIcon(weatherData) {
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

// renders the display of the retrieved information

function displayWeather(weatherData, units) {
  displayCity(weatherData);
  displayTemperature(weatherData);
  displayFeelsLike(weatherData);
  displayTempMax(weatherData);
  displayTempMin(weatherData);
  displayHumidity(weatherData);
  displayReport(weatherData);
  displayIcon(weatherData);
  changeTempUnits(weatherData, units);
}

export { displayWeather };
