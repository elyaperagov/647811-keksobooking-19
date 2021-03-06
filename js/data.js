'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var drawPins = function (pinArray) {
    var fragment = document.createDocumentFragment();
    if (pinArray.length > 5) {
      pinArray = pinArray.slice(0, 5);
    }
    pinArray.forEach(function (element) {
      var userPin = template.cloneNode(true);
      userPin.style.left = (element.location.x - PIN_WIDTH * 0.5) + 'px';
      userPin.style.top = (element.location.y - PIN_HEIGHT) + 'px';
      userPin.querySelector('img').src = element.author.avatar;
      userPin.querySelector('img').alt = element.offer.title;
      fragment.appendChild(userPin);
      userPin.addEventListener('click', function () {
        window.card.removePinActiveClass();
        userPin.classList.add('map__pin--active');
        window.card.renderCards(element);
      });
    });
    pins.appendChild(fragment);
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
