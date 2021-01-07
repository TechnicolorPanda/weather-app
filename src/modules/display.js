function displayWeather(weatherInformation) {
    console.log('display weather in module');
    const displayBox = document.getElementById('content');
    displayBox.innerHTML = weatherInformation.main.temp;
}

export { displayWeather };