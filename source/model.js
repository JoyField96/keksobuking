'use strict'

// Специально объявим некорректный адрес
// const URL = 'https://23.javascript.pages.academy/keksobooking/data';
// let errorMessages =[];
// let makeAlert ='';
// const getPosts = async () => {
//   let response;
//   try {
//     response = await fetch(URL);
//   } catch (error) {
//     alert(`Ошибки: ${error}`);
//     errorMessages.push(error);
//   }
//
//     const posts = await response.json();
//     return posts;
//
// };
// const NUM_OBJECTS = 10;
// const NotSliceobjectsArray = await getPosts();
//
// const objectsArray = NotSliceobjectsArray.slice(0,NUM_OBJECTS);
//
//
//
//
//
// export {objectsArray};
const DATA = 'https://23.javascript.pages.academy/keksobooking/data';
const SERVER = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch((err) => {
      onFail(`Ошибка загрузки данных ${err}`);
    });
};

export {
  getData
};
