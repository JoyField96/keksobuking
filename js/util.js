'use strict'
import {typeHouse,checkin,feature,photos,pos} from './data.js';


const getRandomInt= (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};
const getRandomType = (array) =>{
  const randomIndex =  Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomArray = (features) =>{
  const maxLength = features.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;

  function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}



const getRandomLocation = a => _ => Object.values(a).map(([min, max]) => (Math.random() * (max - min) + min).toFixed(5));
const RandomLocation = getRandomLocation(pos);
let latX = RandomLocation()[0];
let latY = RandomLocation()[1];

const objectsArray = [];

const randomObject = () => {
  for (let i =0;i<10;i++) {
    objectsArray.push({
      autor: {
        avatar: 'img/avatars/user'+ (i + 1) + '.png',
      },
      location: {
        x: latX,
        y: latY,
      },
      offer: {
        title: 'Заголовок',
        address: 'location.' + latX + ' ,location.' + latY,
        price: getRandomInt(10000, 400000),
        type: getRandomType(typeHouse),
        rooms: getRandomInt(1, 6),
        guests: getRandomInt(1, 7),
        checkin: getRandomType(checkin),
        checkout: getRandomType(checkin),
        features: getRandomArray(feature),
        description: 'описание',
        photos: getRandomArray(photos),
      },

    });
  }};

export {objectsArray};
