"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map;
let mapEvent;

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Coult not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    console.log(this);
    this.#map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", function (map) {
      this.#mapEvent = map;
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }
}

const app = new App();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  inputDistance.value = "";
  inputDuration.value = "";
  inputCadence.value = "";
  inputElevation.value = "";

  const { lat, lng } = event.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 500,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
