const changeLocation = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const img = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUi = data => {
  let cityDets = data.cityDets;
  let params = data.params;

  details.innerHTML = `<h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${params.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${params.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>`;

  let timeSrc = null;
  if (params.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }

  img.setAttribute("src", timeSrc);

  let icons = `img/icons/${params.WeatherIcon}.svg`;
  icon.setAttribute("src", icons);

  card.classList.remove("d-none");
};

const updateCity = async value => {
  const cityDets = await getCity(value);
  const params = await getWeather(cityDets.Key);

  return {
    cityDets,
    params
  };
};

changeLocation.addEventListener("submit", e => {
  e.preventDefault();

  let value = changeLocation.city.value.trim().toLowerCase();
  changeLocation.reset();

  updateCity(value)
    .then(data => updateUi(data))
    .catch(err => console.log(err));
});
