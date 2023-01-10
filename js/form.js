
const apartmentType = document.querySelector('#type');
let apartmentPrice = document.querySelector('#price');
apartmentType.addEventListener('change',(function () {

  switch (apartmentType.value) {
    case 'flat':
      apartmentPrice.placeholder = 1000;
      break;

    case 'bungalow':
      apartmentPrice.placeholder = 0;
      break;

    case 'house':
      apartmentPrice.placeholder = 5000;
      break;

    case 'palace':
      apartmentPrice.placeholder = 10000;
      break;
  }
}));

let apartmentTimeIn = document.querySelector('#timein');
let apartmentTimeOut = document.querySelector('#timeout');
apartmentTimeIn.addEventListener('change',(function () {
  switch (apartmentTimeIn.value) {
    case '12:00':
      apartmentTimeOut.value = '12:00';
      break;
    case '13:00':
      apartmentTimeOut.value = '13:00';
      break;
    case '14:00':
      apartmentTimeOut.value = '14:00';
      break;
  }
}));
apartmentTimeOut.addEventListener('change',(function () {
  switch (apartmentTimeOut.value) {
    case '12:00':
      apartmentTimeIn.value = '12:00';
      break;
    case '13:00':
      apartmentTimeIn.value = '13:00';
      break;
    case '14:00':
      apartmentTimeIn.value = '14:00';
      break;
  }
}));

export { apartmentTimeIn,apartmentTimeOut,apartmentType,apartmentPrice };
