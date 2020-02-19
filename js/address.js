'use strict';
(function () {
  var setAddress = function (address) {
    var MAINPIN_HEIGHT = 22;
    var TRANSLATE_X = 6;
    var map = document.querySelector('.map');
    var mainPin = document.querySelector('.map__pin--main');
    var mainPinTop = parseInt(mainPin.style.top, 10);
    var mainPinLeft = parseInt(mainPin.style.left, 10);
    var pinOffsetWidth = mainPin.offsetWidth / 2;
    var pinOffsetHeight = mainPin.offsetHeight + MAINPIN_HEIGHT - TRANSLATE_X;
    var pinOffsetLeft = mainPin.offsetLeft;
    var pinClientWidth = mainPin.clientWidth / 2;
    var pinOffsetTop = mainPin.offsetTop;
    var pinClientHeight = mainPin.clientHeight / 2;
    if (map.classList.contains('map--faded')) {
      address.value = Math.floor(pinOffsetLeft + pinClientWidth) + ', ' + Math.floor(pinOffsetTop + pinClientHeight);
    } else {
      address.value = Math.floor(mainPinLeft + pinOffsetWidth) + ', ' + Math.floor(mainPinTop + pinOffsetHeight);
    }
  };

  window.address = {
    setAddress: setAddress
  };
})();
