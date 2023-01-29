import {geoMarkers} from './generate_map.js';
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


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const showFormMessage = messageTmpl => {
  let body = document.querySelector('body');
  messageTmpl.cloneNode(true);
  body.after(messageTmpl);
  setTimeout(() => messageTmpl.remove(), 3000);
  document.addEventListener('keydown', function(e) {
    if( e.keyCode === 27 ){ // код клавиши Escape, но можно использовать e.key
      messageTmpl.remove();
    }
  });
  document.addEventListener( 'click', (e) => {
    messageTmpl.remove();
  })
}
const resetSetAdressValue = () =>{
  const address = document.querySelector('#address');
  address.value = geoMarkers;
}


const adForm = document.querySelector('.ad-form');
const resetButton = adForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click',function (evt){
  evt.preventDefault();
  adForm.reset();
  resetSetAdressValue()
});

const ajaxSend = async (formData) => {
  const response = await fetch("https://23.javascript.pages.academy/keksobooking", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    showFormMessage(errorTemplate);
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`);
  }
  return showFormMessage(successTemplate);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  ajaxSend(formData)
    .then((response) => {
      console.log(response);
      adForm.reset();
      resetSetAdressValue();
      // очищаем поля формы
    })
    .catch((err) => console.error(err))

});

const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview').children[0];


fileChooser.addEventListener('change', () => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

const fileChooser1 = document.querySelector('#images');
const preview2 = document.querySelector('.ad-form__photo');

fileChooser1.addEventListener('change', () => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  const files = fileChooser1.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {


      const reader = new FileReader();

      reader.addEventListener('load', ( )=> {
        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        img.width = 200;
        img.src = reader.result;
        preview2.appendChild(img); // Предполагается, что "preview" это div, в котором будет отображаться содержимое.


      });
      reader.readAsDataURL(file);
    }
  } });





export { apartmentTimeIn,apartmentTimeOut,checkTimeOnClick,apartmentType,apartmentPrice ,roomSelect,adForm,preview2,preview};
