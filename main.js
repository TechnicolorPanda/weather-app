(()=>{"use strict";function e(e){const n=1.8*(e-273.15)+32;return Math.round(n)}function n(e){const n=e-273.15;return Math.round(n)}function t(t,c){!function(e){document.getElementById("cityName").innerHTML=e.city}(t),function(t,c){const o=document.getElementById("info"),d=document.createElement("h2"),a=t.temperature;if(!0===c){const e=n(a);d.innerHTML=`${e}°C`}else{const n=e(a);d.innerHTML=`${n}°F`}o.appendChild(d)}(t,c),function(t,c){const o=document.getElementById("info"),d=document.createElement("h3"),a=t.feelsLike;if(!0===c){const e=n(a);d.innerHTML=`Feels like ${e}°C`}else{const n=e(a);d.innerHTML=`Feels like ${n}°F`}o.appendChild(d)}(t,c),function(t,c){const o=document.getElementById("info"),d=document.createElement("container");d.setAttribute("id","temp_box");const a=document.createElement("h3"),i=t.tempMax;if(!0===c){const e=n(i);a.innerHTML=`High ${e}°C | `}else{const n=e(i);a.innerHTML=`High ${n}°F | `}d.appendChild(a),o.appendChild(d)}(t,c),function(t,c){const o=document.getElementById("temp_box"),d=document.createElement("h3"),a=t.tempMin;if(!0===c){const e=n(a);d.innerHTML=` Low ${e}°C`}else{const n=e(a);d.innerHTML=` Low ${n}°F`}o.appendChild(d)}(t,c),function(e){const n=document.getElementById("info"),t=document.createElement("h3"),c=e.humidityPercent;t.innerHTML=`Humidity ${c}%`,n.appendChild(t)}(t),function(e){const n=document.getElementById("info"),t=document.createElement("h3"),c=e.report;t.innerHTML=`${c}`,n.appendChild(t)}(t),async function(e){const n=document.querySelector("img"),t=e.iconInfo;!function(e){const n=document.createElement("style");"04n"===e||"04d"===e||"03n"===e||"03d"===e?(n.innerHTML="\n            body{\n                background-image: url('images/cloudy.jpg');\n                background-repeat: no-repeat;\n                background-attachment: fixed;\n                background-size: cover;\n            }",document.head.appendChild(n)):"01d"===e||"01n"===e?(n.innerHTML="\n            body{\n                background-image: url('images/clear.jpeg');\n                background-repeat: no-repeat;\n                background-attachment: fixed;\n                background-size: cover;\n            }",document.head.appendChild(n)):"02d"===e||"02n"===e?(n.innerHTML="\n      body{\n          background-image: url('images/partlycloudy.jpeg');\n          background-repeat: no-repeat;\n          background-attachment: fixed;\n          background-size: cover;\n      }",document.head.appendChild(n)):"09n"===e||"09d"===e||"10n"===e||"10d"===e?(n.innerHTML="\n      body{\n          background-image: url('images/rainy.jpeg');\n          background-repeat: no-repeat;\n          background-attachment: fixed;\n          background-size: cover;\n      }",document.head.appendChild(n)):"11n"===e||"11d"===e?(n.innerHTML="\n      body{\n          background-image: url('images/thunderstorm.jpg');\n          background-repeat: no-repeat;\n          background-attachment: fixed;\n          background-size: cover;\n      }",document.head.appendChild(n)):"13n"===e||"13d"===e?(n.innerHTML="\n      body{\n          background-image: url('images/snow.jpg');\n          background-repeat: no-repeat;\n          background-attachment: fixed;\n          background-size: cover;\n      }",document.head.appendChild(n)):"50n"!==e&&"50d"!==e||(n.innerHTML="\n      body{\n          background-image: url('images/mist.jpg');\n          background-repeat: no-repeat;\n          background-attachment: fixed;\n          background-size: cover;\n      }",document.head.appendChild(n))}(t);try{const e=await fetch(`https://openweathermap.org/img/wn/${t}@2x.png`,{mode:"cors"});n.src=e.url}catch(e){o()}}(t)}class c{constructor(e,n,t,c,o,d,a,i){this.city=e,this.temperature=n,this.feelsLike=t,this.tempMax=c,this.tempMin=o,this.humidityPercent=d,this.report=a,this.iconInfo=i}}function o(){const e=document.getElementById("info"),n=document.createElement("h4");n.innerHTML="Weather data is unable to be displayed. Please try again.",e.appendChild(n)}function d(){document.getElementById("info").innerHTML=""}async function a(e){try{const n=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e},&APPID=5287f004be1ee460907a8a4c96152f64`,{mode:"cors"});!function(e){const n=e.name,o=e.main.temp,a=e.main.feels_like,i=e.main.temp_max,r=e.main.temp_min,m=e.main.humidity,u=e.weather[0].description,s=e.weather[0].icon,l=new c(n,o,a,i,r,m,u,s);(function(e){document.getElementById("toggle").addEventListener("click",(()=>{!function(e){const n=document.getElementById("check").checked;d(),t(e,n)}(e)}))})(l),t(l,document.getElementById("check").checked)}(await n.json())}catch(e){o()}}function i(){d();const e=document.getElementById("info"),n=document.createElement("h4");n.innerHTML="Please enter a valid city name. Do not enter state, country, or zip code.",e.appendChild(n)}document.getElementById("submit").addEventListener("click",(()=>{!function(){const e=document.getElementById("search").value;e.length>=2&&e.length<=74&&/^[a-zA-Z.&' _`-]*$/.test(e)?function(){const e=document.getElementById("search").value;d(),a(e)}():i()}()})),a("Grand Rapids")})();