let state = document.querySelector(".select-state");
let weatherInformer = document.querySelector(".weather-informer");
let inputCity = document.querySelector(".city");

inputCity.onfocus = function () {
  reNew();
};

state.onfocus = function () {
  if (weatherInformer.children.length > 1) {
    reNew();
    inputCity.value = "";
  }
};

function reNew() {
  noCityClear();
  state.innerHTML = "";
  weatherInformer.innerHTML = "";
  weatherInformer.insertAdjacentHTML(
    "afterbegin",
    '<h3 class="no-city hider">Такого города не существует!</h3>'
  );
}

inputCity.onblur = function () {
  if (state.children.length < 1) {
    cityCheck();
  }
};

function noCityClear() {
  weatherInformer.querySelector(".no-city").classList.add("hider");
}

function cityCheck() {
  for (i = 0; i <= cityTable.length - 1; i++) {
    if (inputCity.value == cityTable[i].name) {
      element = `<option value="${cityTable[i].country}">${cityTable[i].country}</option>`;
      state.insertAdjacentHTML("afterbegin", element);
    }
  }
  console.log(state.children.length);
  if (state.children.length < 1) {
    weatherInformer.querySelector(".no-city").classList.remove("hider");
    inputCity.value = "";
  }
  /*inputCity.value = */
}

inputCity.addEventListener("keydown", function (event) {
  noCityClear();
  state.innerHTML = "";
  if (event.key == "Enter") {
    event.preventDefault();
    cityCheck();
  }
  inputCity.value = inputCity.value
    ? inputCity.value[0].toUpperCase() + inputCity.value.slice(1)
    : inputCity.value;
});

document.querySelector(".show-weather").onclick = async function () {
  link = `http://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value},${state.value}&appid=451b5d3fb4eee014ceab03b872899c57`;

  response = await fetch(link);

  if (response.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    jsonFile = await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }

  value = `<img class="weather-icon" src="https://openweathermap.org/img/w/${jsonFile.list[0].weather[0].icon}.png" alt="${jsonFile.list[0].weather[0].description}">`;
  weatherInformer.insertAdjacentHTML("beforeEnd", value);
  value = `<span class="description" >${jsonFile.list[0].weather[0].description}</span>`;
  weatherInformer.insertAdjacentHTML("beforeEnd", value);
  value = `<span class="temperature">Температура: ${
    Math.round(jsonFile.list[0].main.temp) - 273
  }&deg; C</span>`;
  weatherInformer.insertAdjacentHTML("beforeEnd", value);
  value = `<span class="pressure">Давление: ${jsonFile.list[0].main.pressure} hPa</span>`;
  weatherInformer.insertAdjacentHTML("beforeEnd", value);
  value = `<span class="humidity">Влажность: ${jsonFile.list[0].main.humidity} %</span>`;
  weatherInformer.insertAdjacentHTML("beforeEnd", value);
};
