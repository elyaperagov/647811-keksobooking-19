'use strict';
var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var MOUSE_KEY = 0;
// var MAINPIN_HEIGHT = 22;
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
var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
var propertyTypes = ['palace', 'flat', 'house', 'bungalo'];
var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mainPinAddressInput = document.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelectorAll('select[class=map__filter]');
var form = document.querySelector('.ad-form');

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
    console.log(offers);
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

  var renderCards = function (card) {
    var element = adTemplate.cloneNode(true);
    element.querySelector('.popup__title').textContent = card.offer.title;
    return card;
  }

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

changeMapState(fieldsets, true);
changeMapState(mapFilters, true);

var activateMap = function () {
  unfadeMap();
  changeMapState(fieldsets, false);
  changeMapState(mapFilters, false);
  drawPins(generateObjects(8));
  form.classList.remove('ad-form--disabled');
  setAddress(mainPin, mainPinAddressInput);
};

mainPin.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.keyCode === 13) {
    activateMap();
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_KEY) {
    activateMap();
  }
});

var getCoords = function (elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

};

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

/*  ----------------------------------------------- */
var Preferences = {
  MIN_TITLE_LENGTH: 30,
  MAX_TITLE_LENGTH: 100
};

var ALL_PRICES = [0, 1000, 5000, 10000];
// var allRooms = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
// var allGuests = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
var formTitle = form.querySelector('input[name=title]');
var submitButton = form.querySelector('.ad-form__submit');
var price = form.querySelector('input[name=price]');
var houseType = form.querySelector('select[name=type]');
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

// changeMapState(capacity, true);

var setOptions = function (evt) {
  if (evt.target === houseType) {
    price.value = ALL_PRICES[getSelectedOption(houseType)];
    price.placeholder = price.value;
  } if (evt.target === timeIn) {
    timeOut.value = CHECKOUT_TIMES[getSelectedOption(timeIn)];
    timeOut.placeholder = timeOut.value;
  } if (evt.target === timeOut) {
    timeIn.value = CHECKIN_TIMES[getSelectedOption(timeOut)];
    timeIn.placeholder = timeIn.value;
  } if (evt.target === roomNumber) {
    for (var i = 0; i < capacity.length; i++) {
      if (capacity[i].value === '1') {
        // console.log(capacity[i]);
        changeMapState(capacity[i], true);
      // } else {
      //   changeMapState(capacity, true);
      }
    }
  }
};

form.addEventListener('change', setOptions);

var colorChange = function (element) {
  element.style = 'border-color: red; border-width: 5px;';
};

var validateTitle = function (title) {
  if (title.length > Preferences.MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity('Максимальная длина — 100 символов');
    colorChange(formTitle);
    return false;
  } else if (title.length < Preferences.MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity('Минимальная длина — 30 символов');
    colorChange(formTitle);
    return false;
  }
  return true;
};

var splitTitle = function () {
  var titleForInput = formTitle.value.split('');
  if (formTitle.value !== '') {
    validateTitle(titleForInput);
  }
};

submitButton.addEventListener('click', splitTitle);

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
