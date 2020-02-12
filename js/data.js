'use strict';
(function () {
  var Rooms = {
    MINIMUM: 1,
    MAXIMUM: 10
  };
  var Guests = {
    MINIMUM: 1,
    MAXIMUM: 10
  };
  var Prices = {
    MINIMUM: 15,
    MAXIMUM: 200
  };
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var propertyTypes = ['palace', 'flat', 'house', 'bungalo'];
  var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // var filter = map.querySelector('.map__filters-container');
  // var reset = document.querySelector('.ad-form__reset');
  //
  // reset.addEventListener('click', function () {
  //   form.reset();
  // });

  var generateObjects = function (quantity) {
    var offers = [];
    for (var i = 0; i < quantity; i++) {
      offers.push({
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'title': 'заголовок предложения',
          'address': window.helpers.getRandomNumber(map.clientWidth) + ', ' + window.helpers.getRandomInteger(130, 630),
          'price': window.helpers.getRandomInteger(Prices.MINIMUM, Prices.MAXIMUM),
          'type': window.helpers.getRandomElement(propertyTypes),
          'rooms': window.helpers.getRandomInteger(Rooms.MINIMUM, Rooms.MAXIMUM),
          'guests': window.helpers.getRandomInteger(Guests.MINIMUM, Guests.MAXIMUM),
          'CHECKIN_TIMES': window.helpers.getRandomElement(CHECKIN_TIMES),
          'CHECKOUT_TIMES': window.helpers.getRandomElement(CHECKOUT_TIMES),
          'features': window.helpers.getRandomArray(propertyFeatures),
          'description': 'строка с описанием',
          'photos': window.helpers.getRandomArray(propertyPhotos)
        },
        'location': {
          'x': window.helpers.getRandomNumber(map.clientWidth),
          'y': window.helpers.getRandomInteger(130, 630)
        }
      });
    }
    return offers;
  };


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

  window.data = {
    map: map,
    drawPins: drawPins,
    generateObjects: generateObjects
  };
})();
