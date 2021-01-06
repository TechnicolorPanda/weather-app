import { loadHome } from './modules/home';
import { loadWeather } from './modules/weather';

(function initiatePage() {
  console.log('initiate page');
  loadHome();
  loadWeather();
}());
