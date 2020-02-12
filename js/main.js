'use strict';
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var MOUSE_KEY = 0;
var MAINPIN_HEIGHT = 22;
var TRANSLATE_X = 6;
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
var ENTER_KEY = 13;
var map = document.querySelector('.map');
var pins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var propertyTypes = ['palace', 'flat', 'house', 'bungalo'];
var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mainPinAddressInput = document.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelectorAll('select[class=map__filter]');
var form = document.querySelector('.ad-form');
var mainPinLeft = parseInt(mainPin.style.left, 10);
var mainPinTop = parseInt(mainPin.style.top, 10);
var pinOffsetWidth = mainPin.offsetWidth / 2;
var pinOffsetHeight = mainPin.offsetHeight + MAINPIN_HEIGHT - TRANSLATE_X;
var pinOffsetLeft = mainPin.offsetLeft;
var pinClientWidth = mainPin.clientWidth / 2;
var pinOffsetTop = mainPin.offsetTop;
var pinClientHeight = mainPin.clientHeight / 2;
// var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var filter = map.querySelector('.map__filters-container');
// var reset = document.querySelector('.ad-form__reset');
//
// reset.addEventListener('click', function () {
//   form.reset();
// });

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


var changeMapState = function (object, newState) {
  for (var i = 0; i < object.length; i++) {
    object[i].disabled = newState;
  }
};

changeMapState(fieldsets, true);
changeMapState(mapFilters, true);

var isActivated = false;
var activateMap = function () {
  unfadeMap();
  changeMapState(fieldsets, false);
  changeMapState(mapFilters, false);
  if (!isActivated) {
    drawPins(generateObjects(8));
    isActivated = true;
  }
  form.classList.remove('ad-form--disabled');
  setAddress(mainPinAddressInput);
};

mainPin.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === ENTER_KEY) {
    activateMap();
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_KEY) {
    activateMap();
  }
});

var setAddress = function (address) {
  if (map.classList.contains('map--faded')) {
    address.value = Math.floor(pinOffsetLeft + pinClientWidth) + ', ' + Math.floor(pinOffsetTop + pinClientHeight);
  } else {
    address.value = Math.floor(mainPinLeft + pinOffsetWidth) + ', ' + Math.floor(mainPinTop + pinOffsetHeight);
  }
};

setAddress(mainPinAddressInput);

/*  ----------------------------------------------- */

var ALL_PRICES = [0, 1000, 5000, 10000];
var CAPACITY_VALUES = [0, 1, 2, 3];
var ROOMS_VALUES = [1, 2, 3, 100];
// var formTitle = form.querySelector('input[name=title]');
// var submitButton = form.querySelector('.ad-form__submit');
var price = form.querySelector('input[name=price]');
var houseType = form.querySelector('#type');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

var getSelectedOption = function (object) {
  var objectOptions = object.querySelectorAll('option');
  for (var i = 0; i < objectOptions.length; i++) {
    if (objectOptions[i].selected) {
      var selectedOption = i;
    }
  }
  return selectedOption;
};

var checkCapacity = function (rooms, guests) {
  if (Number(rooms.value) === ROOMS_VALUES[0] && Number(guests.value) !== CAPACITY_VALUES[1]) {
    capacity.setCustomValidity('Одна комната - один гость');
  } else if (Number(rooms.value) === ROOMS_VALUES[1] && Number(guests.value) !== CAPACITY_VALUES[1] && Number(capacity.value) !== CAPACITY_VALUES[2]) {
    capacity.setCustomValidity('Две комнаты - для одного или двух гостей');
  } else if (Number(rooms.value) === ROOMS_VALUES[2] && Number(guests.value) === CAPACITY_VALUES[0]) {
    capacity.setCustomValidity('3 комнаты — для 3, 2 или для 1 гостя');
  } else if (Number(rooms.value) === ROOMS_VALUES[3] && Number(guests.value) !== CAPACITY_VALUES[0]) {
    capacity.setCustomValidity('100 комнат — не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

var setOptions = function (evt) {
  if (evt.target === houseType) {
    price.min = ALL_PRICES[getSelectedOption(houseType)];
    price.placeholder = price.min;
  } if (evt.target === timeIn) {
    timeOut.value = CHECKOUT_TIMES[getSelectedOption(timeIn)];
    timeOut.placeholder = timeOut.value;
  } if (evt.target === timeOut) {
    timeIn.value = CHECKIN_TIMES[getSelectedOption(timeOut)];
    timeIn.placeholder = timeIn.value;
  } if (evt.target === roomNumber || evt.target === capacity) {
    checkCapacity(roomNumber, capacity);
  }
};

form.addEventListener('change', setOptions);
