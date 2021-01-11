import { gatherData } from './weather';

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

// changes units upon toggle
// TODO: enable access to change of units upon selection

function changeTempUnits(weatherData, units) {
  const tempToggle = document.getElementById('toggle');
  tempToggle.addEventListener('click', () => {
    units = !units;
    gatherData(weatherData, units);
  });
}

export { temperatureInF, changeTempUnits };
