'use strict';
(function () {
  var map = document.querySelector('.map__overlay');
  var mainPin = document.querySelector('.map__pin--main');
  var mainPinAddressInput = document.querySelector('#address');
  var topLimit = 130;
  var bottomLimit = 630;
  var limits = {
    top: topLimit,
    right: map.offsetWidth + map.offsetLeft - mainPin.offsetWidth,
    bottom: bottomLimit,
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

      if (((mainPin.offsetLeft - shift.x) <= limits.right) && ((mainPin.offsetLeft - shift.x) >= limits.left)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if (((mainPin.offsetTop - shift.y) <= limits.bottom) && ((mainPin.offsetTop - shift.y) >= limits.top)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      // if (e.pageX > limits.right) {
      //    newLocation.x = limits.right;
      //  } else if (e.pageX > limits.left) {
      //    newLocation.x = e.pageX;
      //  }
      //  if (e.pageY > limits.bottom) {
      //    newLocation.y = limits.bottom;
      //  } else if (e.pageY > limits.top) {
      //    newLocation.y = e.pageY;
      //  }

      // console.log(mainPin.getBoundingClientRect());
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
