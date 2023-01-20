const body = document.querySelector("body");
const main = document.getElementById("container");

// get weather info

async function getJSON(city, unit) {
  const response =
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=03f228f472f14860b0098890962da616&units=${unit}
    `);
  if (response.status !== 200) {
    const errorMsg = document.createElement("p");
    const form = document.getElementById("form-container");
    errorMsg.textContent = "City not found, please try again";
    errorMsg.id = "error";
    form.appendChild(errorMsg);
    body.appendChild(form);
  } else {
    const responseData = await response.json();

    return responseData;
  }
}

// prosess weather data

async function processWeatherData(response) {
  const responseData = await response;
  const weather = {
    place: responseData.name,
    currentTemp: responseData.main.temp,
    feelsLike: Math.trunc(responseData.main.feels_like),
    tempMax: Math.trunc(responseData.main.temp_max),
    tempMin: Math.trunc(responseData.main.temp_min),
    weatherDesc: responseData.weather[0].main,
    wind: responseData.wind.speed,
  };
  return weather;
}

// display form input for location query

function displayForm() {
  const form = document.getElementById("form-container");
  const search = document.createElement("input");
  const metric = document.createElement("input");
  metric.type = "radio";
  metric.value = "metric";
  metric.checked = true;
  metric.id = "metric";
  metric.name = "units";
  const labelMetric = document.createElement("label");
  labelMetric.textContent = "Metric units";
  labelMetric.for = "metric";
  const imperial = document.createElement("input");
  imperial.type = "radio";
  imperial.value = "imperial";
  imperial.id = "imperial";
  imperial.name = "units";
  const labelImp = document.createElement("label");
  labelImp.textContent = "Imperial units";
  labelImp.for = "imperial";
  const submit = document.createElement("button");
  submit.textContent = "Show me the weather here";
  submit.addEventListener("click", () => {
    const selectedUnit = document.querySelector(
      "input[name='units']:checked"
    ).value;
    searchButton(search.value, selectedUnit);
  });

  form.appendChild(search);
  form.appendChild(submit);
  form.appendChild(metric);
  form.appendChild(labelMetric);
  form.appendChild(imperial);
  form.appendChild(labelImp);
}

// search button functionality

function searchButton(search, unit) {
  displayWeather(search, unit);
}

// display weather object data on page

async function displayWeather(search, unit) {
  const container = document.getElementById("weather-container");
  const formContainer = document.getElementById("form-container");
  const errorMsg = document.getElementById("error");
  if (errorMsg) formContainer.removeChild(errorMsg);
  const loadingMsg = document.createElement("p");
  loadingMsg.textContent = "loading weather data...";
  loadingMsg.id = "loading";
  container.appendChild(loadingMsg);

  try {
    const data = await processWeatherData(getJSON(search, unit));
    container.removeChild(loadingMsg);
    const place = document.getElementById("place");
    place.textContent = data.place;
    const weathDesc = document.getElementById("desc");
    weathDesc.textContent = `${data.weatherDesc}`;
    const feelsLike = document.getElementById("feels-like");
    feelsLike.textContent = `Feels like now: ${data.feelsLike}°`;
    const minTemp = document.getElementById("min");
    minTemp.textContent = `Min temp today: ${data.tempMin}°`;
    const maxTemp = document.getElementById("max");
    maxTemp.textContent = `Max temp today: ${data.tempMax}°`;
    const windSpd = document.getElementById("wind");
    windSpd.textContent = `Wind speed: ${data.wind}`;
  } catch (error) {
    container.removeChild(loadingMsg);
  }
}

// init functions and append page content

displayForm();
displayWeather("London", "metric");
