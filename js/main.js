'use strict';
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var propertyRooms = {
  MINIMUM: 1,
  MAXIMUM: 10
};
var propertyGuests = {
  MINIMUM: 1,
  MAXIMUM: 10
};
var propertyPrice = {
  MINIMUM: 15,
  MAXIMUM: 200
};
var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var propertyType = ['palace', 'flat', 'house', 'bungalo'];
var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var unfadeMap = function () {
  map.classList.remove('map--faded');
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var generateRandomArrayElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

var generateObjects = function (quantity) {
  var offers = [];
  for (var i = 0; i < quantity; i++) { // почему не quantity.length
    offers.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': getRandomNumber(map.clientWidth) + ', ' + getRandomInteger(130, 630),
        'price': getRandomInteger(propertyPrice.MINIMUM, propertyPrice.MAXIMUM),
        'type': generateRandomArrayElement(propertyType),
        'rooms': getRandomInteger(propertyRooms.MINIMUM, propertyRooms.MAXIMUM),
        'guests': getRandomInteger(propertyGuests.MINIMUM, propertyGuests.MAXIMUM),
        'checkin': generateRandomArrayElement(CHECKIN),
        'checkout': generateRandomArrayElement(CHECKOUT),
        'features': generateRandomArrayElement(propertyFeatures),
        'description': 'строка с описанием',
        'photos': generateRandomArrayElement(propertyPhotos)
      },
      'location': {
        'x': getRandomNumber(map.clientWidth),
        'y': getRandomInteger(130, 630)
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
  userPin.querySelector('img').alt = pin.author.title;

  return userPin;
};

var getPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderTemplate(array[i]));
  }
  pins.appendChild(fragment);
};

getPins(generateObjects(8));
unfadeMap();
