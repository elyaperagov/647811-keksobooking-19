'use strict';
(function () {
  var ENTER_KEY = 13;
  var MOUSE_KEY = 0;
  var MAINPIN_HEIGHT = 22;
  var TRANSLATE_X = 6;
  var mainPinAddressInput = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinLeft = parseInt(mainPin.style.left, 10);
  var mainPinTop = parseInt(mainPin.style.top, 10);
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('select[class=map__filter]');
  var adForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var pinOffsetWidth = mainPin.offsetWidth / 2;
  var pinOffsetHeight = mainPin.offsetHeight + MAINPIN_HEIGHT - TRANSLATE_X;
  var pinOffsetLeft = mainPin.offsetLeft;
  var pinClientWidth = mainPin.clientWidth / 2;
  var pinOffsetTop = mainPin.offsetTop;
  var pinClientHeight = mainPin.clientHeight / 2;

  var unfadeMap = function () {
    map.classList.remove('map--faded');
  };

  var successHandler = function (data) {
    window.data.drawPins(data);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.helpers.changeMapState(fieldsets, true);
  window.helpers.changeMapState(mapFilters, true);

  var isActivated = false;
  var activateMap = function () {
    unfadeMap();
    window.helpers.changeMapState(fieldsets, false);
    window.helpers.changeMapState(mapFilters, false);
    if (!isActivated) {
      window.backend.load(URL, successHandler, errorHandler);
      isActivated = true;
    }
    adForm.classList.remove('ad-form--disabled');
    setAddress(mainPinAddressInput);
  };

  mainPin.addEventListener('keydown', function (evt) {
    evt.preventDefault();
    if (evt.keyCode === ENTER_KEY) {
      activateMap();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === MOUSE_KEY) {
      activateMap();
    }
  });

  var setAddress = function (address) {
    if (map.classList.contains('map--faded')) {
      address.value = Math.floor(pinOffsetLeft + pinClientWidth) + ', ' + Math.floor(pinOffsetTop + pinClientHeight);
    } else {
      address.value = Math.floor(mainPinLeft + pinOffsetWidth) + ', ' + Math.floor(mainPinTop + pinOffsetHeight);
    }
  };

  setAddress(mainPinAddressInput);

})();