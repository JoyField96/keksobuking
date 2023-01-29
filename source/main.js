'use strict';

import {map} from './generate_map.js';
import {getData} from './model.js';
import {activateMapFilter, checkAllFilters, changeFilters} from './filter.js';
import {apartmentTimeIn,apartmentTimeOut,apartmentType,checkTimeOnClick,apartmentPrice,roomSelect,adForm,preview2,preview} from './form.js';
import {debounce} from './util.js';
// Задержка отображения маркеров на карте
const TIMEOUT_DELAY = 500;

getData((ads) => {
  checkAllFilters(ads),
    changeFilters(debounce(() => checkAllFilters(ads), TIMEOUT_DELAY));
  activateMapFilter(); // При успешной загрузке карты фильтр для карты переключается в активное состояние

});

