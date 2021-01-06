function loadWeather() {
  console.log('load weather');
  const city = 'Grand Rapids';
  getWeather(city);
}

// retrieve weather data from openweather.com

async function getWeather(city) {
  const weatherContainer = document.querySelector('container');
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5287f004be1ee460907a8a4c96152f64`, {
      mode: 'cors',
    });
    const weatherInformation = await response.json();
    console.log(weatherInformation);
  } catch (err) {
    errorResult();
  }
}

function errorResult() {
  console.log('error in retrieving weather');
}

export { loadWeather };
