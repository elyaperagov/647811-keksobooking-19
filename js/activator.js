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
  var unfadeMap = function () {
    map.classList.remove('map--faded');
  };

  window.helpers.changeMapState(fieldsets, true);
  window.helpers.changeMapState(mapFilters, true);

  var addPins = function (data) {
    window.data.drawPins(data);
  };

  var toggle = function (disabled) {
    if (disabled) {
      unfadeMap();
      window.helpers.changeMapState(fieldsets, false);
      window.helpers.changeMapState(mapFilters, false);
      window.backend.load(URL, addPins, window.helpers.showErrorMessage);
      adForm.classList.remove('ad-form--disabled');
      window.address.setAddress(mainPinAddressInput);
      // mainPin.removeEventListener('keydown', mainPinKeyDownHandler); // почему нельзя удалить внутри mainPinKeyDownHandler?
    } else {
      main.lastChild.remove();
      map.classList.add('map--faded');
      window.form.clearForm();
      window.helpers.changeMapState(fieldsets, true);
      window.helpers.changeMapState(mapFilters, true);
      window.address.setAddress(mainPinAddressInput);
      window.data.removePins();
      mainPin.addEventListener('mousedown', mainPinClickHandler);
      mainPin.addEventListener('keydown', mainPinKeyDownHandler);
    }
    document.removeEventListener('keydown', removeSuccessKeydownHandler);
  };

  var mainPinKeyDownHandler = function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEY) {
      toggle(true);
    }
    mainPin.removeEventListener('keydown', mainPinKeyDownHandler);
  };

  mainPin.addEventListener('keydown', mainPinKeyDownHandler);

  var mainPinClickHandler = function (evt) {
    if (evt.button === MOUSE_KEY) {
      toggle(true);
    }
    mainPin.removeEventListener('mousedown', mainPinClickHandler);
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);

  var removeSuccessHandler = function () {
    toggle(false);
    document.removeEventListener('click', removeSuccessHandler);
    document.removeEventListener('keydown', removeSuccessHandler);
  };

  var removeSuccessKeydownHandler = function (evt) {
    window.helpers.isEscEvent(evt, removeSuccessHandler);
  };

  var removeErrorHandler = function () {
    main.lastChild.remove();
    document.removeEventListener('click', removeErrorHandler);
    document.removeEventListener('keydown', removeErrorKeydownHandler);
  };

  var removeErrorKeydownHandler = function (evt) {
    window.helpers.isEscEvent(evt, removeErrorHandler);
  };

  window.address.setAddress(mainPinAddressInput);

  window.activator = {
    removeSuccessHandler: removeSuccessHandler,
    removeSuccessKeydownHandler: removeSuccessKeydownHandler,
    removeErrorHandler: removeErrorHandler,
    removeErrorKeydownHandler: removeErrorKeydownHandler
  };

})();
