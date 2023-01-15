
const apartmentType = document.querySelector('#type');
const apartmentTitle = document.querySelector('#title');
const roomSelect = document.querySelector('#room_number');

const roomsCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const capacitySelect = document.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
let apartmentPrice = document.querySelector('#price');


apartmentType.addEventListener('change',(function () {

  switch (apartmentType.value) {
    case 'flat':
      apartmentPrice.value = 1000;
      break;

    case 'bungalow':
      apartmentPrice.value = 0;
      break;

    case 'house':
      apartmentPrice.value = 5000;
      break;

    case 'palace':
      apartmentPrice.value = 10000;
      break;
  }
}));

apartmentPrice.addEventListener('input', () => {
  const valuePrice = apartmentPrice.value;
  if (valuePrice > 1000000){
    apartmentPrice.setCustomValidity('Цена до 1 мл');
  }else {
    apartmentPrice.setCustomValidity('');
  }
  apartmentPrice.reportValidity();
});


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
apartmentTitle.addEventListener('input', () => {
  const valueLength = apartmentTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    apartmentTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) +' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    apartmentTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) +' симв.');
  } else {
    apartmentTitle.setCustomValidity('');
  }

  apartmentTitle.reportValidity();
});


const validateRoomSelect = () => {
  capacityOptions.forEach((option) => {
    option.selected = roomsCapacity[roomSelect.value][0] === option.value;
    option.disabled = roomsCapacity[roomSelect.value].indexOf(option.value) < 0;
    option.hidden = option.disabled;
  });
};

validateRoomSelect();

const onRoomSelectChange = () => {
  validateRoomSelect();
};

roomSelect.addEventListener('change', onRoomSelectChange);

function checkTimeOnClick(selectElemets, changedElement) {
  switch (selectElemets.value) {
    case '12:00':
      changedElement.value = '12:00';
      break;
    case '13:00':
      changedElement.value = '13:00';
      break;
    case '14:00':
      changedElement.value = '14:00';
      break;
  }
}

let apartmentTimeIn = document.querySelector('#timein');
let apartmentTimeOut = document.querySelector('#timeout');

apartmentTimeIn.addEventListener('change',checkTimeOnClick.bind(null,apartmentTimeIn,apartmentTimeOut));
apartmentTimeOut.addEventListener('change',checkTimeOnClick.bind(null,apartmentTimeOut,apartmentTimeIn));

export { apartmentTimeIn,apartmentTimeOut,checkTimeOnClick,apartmentType,apartmentPrice ,roomSelect};
