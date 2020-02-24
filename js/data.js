'use strict';
(function () {
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderTemplate = function (pin) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var userPin = template.cloneNode(true);

    userPin.style.left = (pin.location.x - PIN_WIDTH * 0.5) + 'px';
    userPin.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
    userPin.querySelector('img').src = pin.author.avatar;
    userPin.querySelector('img').alt = pin.offer.title;
    return userPin;
  };

  // var allPins = document.querySelectorAll('button[type=button]');
  //
  // var addCards = function (fragment, array, arr) {
  //   for (var i = 0; i < array.length; i++) {
  //     array[i].addEventListener('click', function () {
  //       // fragment.appendChild(window.card.renderCards(arr[i]));
  //       console.log(array[i]);
  //     });
  //   }
  // }

  var drawPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
      fragment.appendChild(window.card.renderCards(array[0]));
      // addCards(fragment, allPins, array);
    }
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
