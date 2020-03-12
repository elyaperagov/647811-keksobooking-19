'use strict';
(function () {
  var ENTER_KEY = 13;
  var MOUSE_KEY = 0;
  var main = document.querySelector('main');
  var mainPinAddressInput = document.querySelector('#address');
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('select[class=map__filter]');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var filters = document.querySelector('.map__filters');

  var unfadeMap = function () {
    map.classList.remove('map--faded');
  };

  window.helpers.changeMapState(fieldsets, true);
  window.helpers.changeMapState(mapFilters, true);

  var toggle = function (disabled) {
    if (disabled) {
      main.lastChild.remove();
      map.classList.add('map--faded');
      window.form.clearForm();
      window.helpers.changeMapState(fieldsets, true);
      window.helpers.changeMapState(mapFilters, true);
      window.address.setAddress(mainPinAddressInput);
      window.data.removePins();
      mainPin.addEventListener('mousedown', mainPinClickHandler);
      mainPin.addEventListener('keydown', mainPinKeyDownHandler);
      document.removeEventListener('click', window.form.deActivate);
      document.removeEventListener('keydown', window.form.deActivate);
    } else {
      unfadeMap();
      window.helpers.changeMapState(fieldsets, false);
      window.helpers.changeMapState(mapFilters, false);
      window.backend.load(URL, addPins, window.helpers.showErrorMessage);
      adForm.classList.remove('ad-form--disabled');
      window.address.setAddress(mainPinAddressInput);
      // mainPin.removeEventListener('keydown', mainPinKeyDownHandler); // почему нельзя удалить внутри mainPinKeyDownHandler?
    }
  };

  var mainPinKeyDownHandler = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEY) {
      toggle(false);
    }
    mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
  };

  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  var mainPinClickHandler = function (evt) {
    if (evt.button === MOUSE_KEY) {
      toggle(false);
    }
    mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);

  window.address.setAddress(mainPinAddressInput);

  var addPins = function (data) {
    window.data.drawPins(data);

    filters.addEventListener('change', window.debounce(function () {
      window.filter.filterReset();
      window.data.drawPins(window.filter.applyFilters(data));
    }));

  };


  window.activator = {
    toggle: toggle
  };

})();
