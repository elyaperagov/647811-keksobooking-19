'use strict';
(function () {
  var ENTER_KEY = 13;
  var MOUSE_KEY = 0;
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

  var fadeMap = function () {
    map.classList.add('map--faded');
  };

  window.helpers.changeMapState(fieldsets, true);
  window.helpers.changeMapState(mapFilters, true);

  var toggle = function (disabled) {
    if (disabled) {
      var successPopup = document.querySelector('.success');
      var errorPopup = document.querySelector('.error');
      window.previews.avatarPreview.src = 'img/muffin-grey.svg';
      window.previews.formPicturePreview.innerHTML = '';
      window.helpers.removeNode(successPopup, errorPopup);
      fadeMap();
      window.form.clearForm();
      window.form.setDefaultPrice();
      filters.reset();
      window.helpers.changeMapState(fieldsets, true);
      window.helpers.changeMapState(mapFilters, true);
      window.data.removePins();
      mainPin.addEventListener('mousedown', mainPinClickHandler);
      mainPin.addEventListener('keydown', mainPinKeyDownHandler);
      document.removeEventListener('click', window.form.toggleActivateHandler);
      document.removeEventListener('keydown', window.form.toggleActivateHandler);
      window.drag.returnToDefaultPin();
      window.address.setAddress(mainPinAddressInput);
    } else {
      unfadeMap();
      window.helpers.changeMapState(fieldsets, false);
      window.helpers.changeMapState(mapFilters, false);
      window.backend.load(URL, addPins, window.helpers.showErrorMessage);
      adForm.classList.remove('ad-form--disabled');
      window.form.setDefaultPrice();
      window.address.setAddress(mainPinAddressInput);
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

  window.backend.load(URL, fadeMap, window.helpers.showOfflineErrorMessage);

  window.activator = {
    toggle: toggle
  };

})();
