
import {objectsArray} from './util.js';
import { renderApartment} from './generate.js';
function ableForms(form) {
  Array.from(form.elements).forEach(formElement => formElement.disabled = false);
}
function disableForms(form) {
  Array.from(form.elements).forEach(formElement => formElement.disabled = true);
}

const map = L.map('map-canvas');
const form = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
form.classList.add('ad-form--disabled');
disableForms(form);
mapForm.classList.add('ad-form--disabled');
disableForms(mapForm);

// map.on('mousedown', () => {
//   form.classList.add('ad-form--disabled');
//   disableForms(form);
//   mapForm.classList.add('ad-form--disabled');
//   disableForms(mapForm);
// })
// map.on('mouseup', () => {
//   form.classList.remove('ad-form--disabled');
//   ableForms(form);
//   mapForm.classList.remove('ad-form--disabled');
//   ableForms(mapForm);
// })


map.on('load',() => {
  form.classList.remove('ad-form--disabled');
  mapForm.classList.remove('ad-form--disabled');
  ableForms(form);
  ableForms(mapForm);
});

map.setView({
  lat: 35.683472,
  lng: 139.752669,
}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
const mainPinIcon = L.icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.68347,
    lng: 139.75266,
  },
  {
    draggable: true,
    icon:mainPinIcon,
  },
);

marker.addTo(map);

const address = document.querySelector('#address');
let geoMarkerJson = marker.toGeoJSON(4);
let geoMarkers = geoMarkerJson.geometry.coordinates.toString();
address.readOnly = true;
address.value = geoMarkers;

marker.on('dragstart', () => {
  address.disabled = true;
  address.value =  marker.toGeoJSON(4).geometry.coordinates.toString();

});

marker.on('moveend', () => {
  address.disabled = false;
});

const points = objectsArray;
console.log(points);


points.forEach((point) => {
 const {location} = point;
  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const markers = L.marker(
    {
      lat:location.x,
      lng:location.y,
    },
    {
      icon,
    },
  );


  markers
    .addTo(map)
    .bindPopup(renderApartment(point));
});

export { map };
