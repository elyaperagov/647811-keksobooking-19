'use strict';
(function () {
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var removePinActiveClass = function () {
    var allPins = map.querySelectorAll('.map__pin');
    allPins.forEach(function (it) {
      if (it.classList.contains('map__pin--active')) {
        it.classList.remove('map__pin--active');
      }
    });
  };

  var drawPins = function (array) {
    array.forEach(function (element) {
      var userPin = template.cloneNode(true);
      userPin.style.left = (element.location.x - PIN_WIDTH * 0.5) + 'px';
      userPin.style.top = (element.location.y - PIN_HEIGHT) + 'px';
      userPin.querySelector('img').src = element.author.avatar;
      userPin.querySelector('img').alt = element.offer.title;
      pins.appendChild(userPin);
      userPin.addEventListener('click', function () {
        removePinActiveClass();
        userPin.classList.add('map__pin--active');
        window.card.renderCards(element);
      });
    });
    // pins.appendChild(fragment);
  };

  var removePins = function () {
    var pinElements = map.querySelectorAll('button[type=button]');
    pinElements.forEach(function (element) {
      element.remove();
    });
  };

  window.data = {
    drawPins: drawPins,
    removePins: removePins
  };
})();
