'use strict';
(function () {
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  // var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // var filter = map.querySelector('.map__filters-container');
  // var reset = document.querySelector('.ad-form__reset');
  //
  // reset.addEventListener('click', function () {
  //   form.reset();
  // });

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

  // var renderCards = function (card) {
  //   var element = adTemplate.cloneNode(true);
  //   var popupTitle = element.querySelector('.popup__title');
  //   // element.querySelector('.popup__title').textContent = card.offer.title;
  //   // console.log(card.offer);
  //   // return element;
  // };

  var drawPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }
    pins.appendChild(fragment);
  };

  window.pinRender = {
    drawPins: drawPins
  };
})();
