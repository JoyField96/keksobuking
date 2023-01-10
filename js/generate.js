'use strict';

import {objectsArray} from './util.js';

const apartmentTemplate = document.querySelector('#card').content.querySelector('.popup');
const apartmentAddTest = document.querySelector('#map-canvas');

const renderApartment = ({offer,autor}) => {
  const apartmentPreview = apartmentTemplate.cloneNode(true);

  apartmentPreview.querySelector('.popup__title').textContent = offer.title;
  apartmentPreview.querySelector('.popup__text--address').textContent = offer.address;
  apartmentPreview.querySelector('.popup__text--price').textContent = offer.price +' ₽/ночь';
  const apartmentType = apartmentPreview.querySelector('.popup__type');
  let apartmetnTypeText='';
  switch(offer.type) {
    case 'flat':
      apartmetnTypeText = 'Квартира';
      break;

    case 'bungalow':
      apartmetnTypeText = 'Бунгало';
      break;

    case 'house':
      apartmetnTypeText = 'Дом';
      break;

    case 'palace':
      apartmetnTypeText = 'Дворец';
      break;

  }
  apartmentType.textContent = apartmetnTypeText;

  apartmentPreview.querySelector('.popup__text--capacity').textContent = offer.rooms +' комнаты для '+ offer.guests+ ' гостей';
  apartmentPreview.querySelector('.popup__text--time').textContent = offer.checkin +', выезд до '+ offer.checkout;
  const apartmentFeatures =  apartmentPreview.querySelector('.popup__features');

  offer.features.forEach((feature) => {
    let featureLi = document.createElement('li');
    featureLi.classList.add('popup__feature');
    featureLi.classList.add('popup__feature--'+feature);
    apartmentFeatures.appendChild(featureLi);
  });

  apartmentPreview.querySelector('.popup__description').textContent = offer.description;
const galleryPhotos = apartmentPreview.querySelector('.popup__photos');
  offer.photos.forEach((photo) => {
    let img = document.createElement('img');
    img.src= photo;
    img.classList.add('.popup__photo');
    img.width= 45;
    img.height = 40;
    galleryPhotos.appendChild(img);
  });

  apartmentPreview.querySelector('.popup__avatar').src = autor.avatar;

  return apartmentPreview;
};

const renderApartments = () => {
  let apartmentListFragment = document.createDocumentFragment();
  objectsArray.forEach((offer) => {
    apartmentListFragment.appendChild(renderApartment(offer));
  });

  apartmentAddTest.appendChild(apartmentListFragment);
};

export { renderApartments };

