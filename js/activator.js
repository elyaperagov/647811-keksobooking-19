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

  window.helpers.changeMapState(fieldsets, true);
  window.helpers.changeMapState(mapFilters, true);

  var isActivated = false;
  var activateMap = function () {
    unfadeMap();
    window.helpers.changeMapState(fieldsets, false);
    window.helpers.changeMapState(mapFilters, false);
    if (!isActivated) {
      // window.data.drawPins(window.backend.load);
      window.pinRender.drawPins(window.pinRender.generateObjects(8));
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
