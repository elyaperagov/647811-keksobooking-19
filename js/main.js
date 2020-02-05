'use strict';
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
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
var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var propertyTypes = ['palace', 'flat', 'house', 'bungalo'];
var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelectorAll('select[class=map__filter]');

var unfadeMap = function () {
  map.classList.remove('map--faded');
};

var getRandomArray = function (arr) {
  var number = getRandomInteger(1, arr.length);
  var arrItems = [];
  for (var i = 0; i < number; i++) {
    arrItems.push(arr[i]);
  }
  return arrItems;
};

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var getRandomElement = function (array) {
  var random = Math.floor(Math.random() * array.length);
  return array[random];
};

var generateObjects = function (quantity) {
  var offers = [];
  for (var i = 0; i < quantity; i++) {
    offers.push({
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        'address': getRandomNumber(map.clientWidth) + ', ' + getRandomInteger(130, 630),
        'price': getRandomInteger(Prices.MINIMUM, Prices.MAXIMUM),
        'type': getRandomElement(propertyTypes),
        'rooms': getRandomInteger(Rooms.MINIMUM, Rooms.MAXIMUM),
        'guests': getRandomInteger(Guests.MINIMUM, Guests.MAXIMUM),
        'CHECKIN_TIMES': getRandomElement(CHECKIN_TIMES),
        'CHECKOUT_TIMES': getRandomElement(CHECKOUT_TIMES),
        'features': getRandomArray(propertyFeatures),
        'description': 'строка с описанием',
        'photos': getRandomArray(propertyPhotos)
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
  userPin.querySelector('img').alt = pin.offer.title;

  return userPin;
};

var drawPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderTemplate(array[i]));
  }
  pins.appendChild(fragment);
};

// drawPins(generateObjects(8));
// unfadeMap();

var changeMapState = function (object, newState) {
  for (var i = 0; i < object.length; i++) {
    object[i].disabled = newState;
  }
};

changeMapState(fieldsets, false);
changeMapState(mapFilters, false);

var activateMap = function () {
  unfadeMap();
  changeMapState(fieldsets, true);
  changeMapState(mapFilters, true);
  drawPins(generateObjects(8));
  setAddress(mainPin, mainPinAddressInput);
};

mainPin.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === 13) {
    activateMap();
  }
});

var MOUSE_KEY = 0;
mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_KEY) {
  activateMap();
  }
});

var MAINPIN_HEIGHT = 22;
var mainPin = document.querySelector('.map__pin--main');
var mainPinAddressInput = document.querySelector('#address');

function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

var setAddress = function (object, objectInput) {
  if (map.classList.contains('map--faded')) {
    objectInput.value = mainPin.offsetLeft + mainPin.clientWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.clientHeight / 2);
    // console.log(mainPin.offsetLeft);
    // console.log(mainPin.clientWidth);
  } else {
    objectInput.value = getCoords(mainPinAddressInput);
  }
};

setAddress(mainPin, mainPinAddressInput);


// var MAINPIN_HEIGHT = 22;
// var mainPin = document.querySelector('.map__pin--main');
// var mainPinAddressInput = document.querySelector('#address');
//
// var getAddress = function (coords) {
//   mainPinAddressInput.value = coords.left + ' , ' + coords.top;
// }
//
// var getCoords = function (elem) { // кроме IE8-
//   var box = elem.getBoundingClientRect();
//
//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset
//   };
// }
//
// var setAddress = function (object, objectInput) {
//   if (map.classList.contains('map--faded')) {
//     objectInput.value = getAddress(getCoords(mainPin));
//   }
// };
//
// console.log(getCoords(mainPin));
// setAddress(mainPin, mainPinAddressInput);
