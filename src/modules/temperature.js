/* eslint-disable import/no-cycle */
import { displayWeather } from './home';
import { resetPage } from './weather';

// converts temperature from Kelvin to Farenheit

function temperatureInF(tempInK) {
  const tempInF = (tempInK - 273.15) * (9 / 5) + 32;
  return Math.round(tempInF);
}

// converts temperature from Kelvin to Celcius

function temperatureInC(tempInK) {
  const tempInC = (tempInK - 273.15);
  return Math.round(tempInC);
}

function changeUnits(weatherData) {
  const units = document.getElementById('check').checked;
  resetPage();
  displayWeather(weatherData, units);
}

// changes units upon toggle

function changeTempUnits(weatherData) {
  const tempToggle = document.getElementById('toggle');
  tempToggle.addEventListener('click', () => {
    changeUnits(weatherData);
  });
}

export { temperatureInF, temperatureInC, changeTempUnits };
