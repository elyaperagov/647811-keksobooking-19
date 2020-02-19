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

  var activateMap = function (disabled) {
    if (disabled) {
      unfadeMap();
      window.helpers.changeMapState(fieldsets, false);
      window.helpers.changeMapState(mapFilters, false);
      window.backend.load(URL, window.popups.successHandler, window.popups.errorHandler);
      adForm.classList.remove('ad-form--disabled');
      window.address.setAddress(mainPinAddressInput);
    } else {
      return;
    }
  };

  mainPin.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEY) {
      activateMap(true);
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === MOUSE_KEY) {
      activateMap(true);
    }
  });

  var successClickHandler = function () {
    main.lastChild.remove();
    // main.removeChild(success); success не является ребенком main?
    map.classList.add('map--faded');
    window.form.clearForm();
    window.helpers.changeMapState(fieldsets, true);
    window.helpers.changeMapState(mapFilters, true);
    window.address.setAddress(mainPinAddressInput);
    window.data.removePins();
    document.removeEventListener('click', successClickHandler);
    document.removeEventListener('keydown', successKeydownHandler);
  };

  var successKeydownHandler = function (evt) {
    window.helpers.isEscEvent(evt, successClickHandler);
  };

  var errorClickHandler = function () {
    main.lastChild.remove();
    document.removeEventListener('click', errorClickHandler);
    document.removeEventListener('keydown', errorKeydownHandler);
  };

  var errorKeydownHandler = function (evt) {
    window.helpers.isEscEvent(evt, errorClickHandler);
  };

  window.address.setAddress(mainPinAddressInput);

  window.activator = {
    successClickHandler: successClickHandler,
    successKeydownHandler: successKeydownHandler,
    errorClickHandler: errorClickHandler,
    errorKeydownHandler: errorKeydownHandler
  };

})();
