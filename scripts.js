// get weather info

async function getJSON() {
  const response =
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=53.48&lon=-2.24&appid=03f228f472f14860b0098890962da616&units=metric
    `);

  const responseData = await response.json();
  //console.log(responseData);
  return responseData;
}

// prosess weather data

async function processWeatherData(response) {
  const responseData = await response;
  console.log(responseData);
  const weather = {
    place: responseData.name,
    currentTemp: responseData.main.temp,
    feelsLike: responseData.main.feels_like,
    tempMax: responseData.main.temp_max,
    tempMin: responseData.main.temp_min,
    weatherDesc: responseData.weather[0].main,
    wind: responseData.wind.speed,
  };
  return weather;
}

// display form input for location query

// display weather object data on page

async function displayWeather() {
  // add a loading component that shows before below data loads
  const data = await processWeatherData(getJSON());
  console.log(data);
}

displayWeather();
