'use strict';
(function () {
  var map = document.querySelector('.map__overlay');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinAddressInput = document.querySelector('#address');
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var mapLimit = {
    top: TOP_LIMIT,
    right: map.offsetWidth + map.offsetLeft - mainPin.offsetWidth,
    bottom: BOTTOM_LIMIT,
    left: map.offsetLeft
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mainPin.offsetLeft - shift.x <= mapLimit.right) && ((mainPin.offsetLeft - shift.x) >= mapLimit.left)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if (((mainPin.offsetTop - shift.y) <= mapLimit.bottom) && ((mainPin.offsetTop - shift.y) >= mapLimit.top)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      window.address.setAddress(mainPinAddressInput);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
