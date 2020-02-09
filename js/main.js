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
// var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
var propertyTypes = ['palace', 'flat', 'house', 'bungalo'];
var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mainPinAddressInput = document.querySelector('#address');
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('fieldset');
var mapFilters = document.querySelectorAll('select[class=map__filter]');
var form = document.querySelector('.ad-form');
var reset = document.querySelector('.ad-form__reset');

reset.addEventListener('click', function () {
  form.reset();
});

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
    // console.log(offers);
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

  // var renderCards = function (card) {
  //   var element = adTemplate.cloneNode(true);
  //   element.querySelector('.popup__title').textContent = card.offer.title;
  //   return card;
  // };

  return userPin;
};


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
  if (evt.keyCode === ENTER_KEY) {
    activateMap();
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === MOUSE_KEY) {
    activateMap();
  }
});

var getCoords = function (elem) {
  return {
    top: elem.offsetLeft + elem.clientWidth / 2,
    left: elem.offsetTop + elem.clientHeight + MAINPIN_HEIGHT - TRANSLATE_X
  };
};

var setAddress = function (object, objectInput) {
  if (map.classList.contains('map--faded')) {
    objectInput.value = mainPin.offsetLeft + mainPin.clientWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.clientHeight / 2);
  } else {
    objectInput.value = getCoords(mainPin).top + ', ' + getCoords(mainPin).left;
  }
};

setAddress(mainPin, mainPinAddressInput);

/*  ----------------------------------------------- */
// var Preferences = {
//   MIN_TITLE_LENGTH: 30,
//   MAX_TITLE_LENGTH: 100
// };

// var ALL_PRICES = {
//   'palace': 10000,
//   'flat': 1000,
//   'house': 5000,
//   'bungalo': 0
// };

var ALL_PRICES = [0, 1000, 5000, 10000];

// var allRooms = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
// var allGuests = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
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
    if (Number(roomNumber.value) === 1 && Number(capacity.value) !== 1) {
      capacity.setCustomValidity('Одна комната - один гость');
    } else if (Number(roomNumber.value) === 2 && Number(capacity.value) !== 1 && Number(capacity.value) !== 2) {
      capacity.setCustomValidity('Две комнаты - для одного или двух гостей');
    } else if (Number(roomNumber.value) === 3 && Number(capacity.value) === 0) {
      capacity.setCustomValidity('3 комнаты — для 3, 2 или для 1 гостя');
    } else if (Number(roomNumber.value) === 100 && Number(capacity.value) !== 0) {
      capacity.setCustomValidity('100 комнат — не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  }
};

form.addEventListener('change', setOptions);

// var disableOptions = function (select) {
//   for (var i = 0; i < select.options.length; i++) {
//     select.options[i].setAttribute('disabled', '');
//   }
// };

// roomNumber.addEventListener('click', roomsInputClickHandler);
//
// var roomsInputClickHandler = function () {
//   disableOptions(capacity);
//   if (roomNumber.value === '1') {
//     capacity.options[2].removeAttribute('disabled');
//   } if (roomNumber.value === '2') {
//     capacity.options[1].removeAttribute('disabled');
//     capacity.options[2].removeAttribute('disabled');
//   } if (roomNumber.value === '3') {
//     capacity.options[0].removeAttribute('disabled');
//     capacity.options[1].removeAttribute('disabled');
//     capacity.options[2].removeAttribute('disabled');
//   } if (roomNumber.value === '100') {
//     capacity.options[3].removeAttribute('disabled');
//   }
// };
//
// roomNumber.addEventListener('click', roomsInputClickHandler);
//
// var capacityInputClickHandler = function () {
//   disableOptions(roomNumber);
//   if (capacity.value === '0') {
//     roomNumber.options[3].removeAttribute('disabled');
//   } if (capacity.value === '1') {
//     roomNumber.options[0].removeAttribute('disabled');
//   } if (capacity.value === '2') {
//     roomNumber.options[1].removeAttribute('disabled');
//     roomNumber.options[2].removeAttribute('disabled');
//   } if (capacity.value === '3') {
//     roomNumber.options[2].removeAttribute('disabled');
//   }
// };
//
// capacity.addEventListener('click', capacityInputClickHandler);

// var colorChange = function (element) {
//   element.style = 'border-color: red; border-width: 5px;';
// };


// var validateTitle = function (title) {
//   if (title.length > Preferences.MAX_TITLE_LENGTH) {
//     formTitle.setCustomValidity('Максимальная длина — 100 символов');
//     colorChange(formTitle);
//     formTitle.reset();
//     return false;
//   } else if (title.length < Preferences.MIN_TITLE_LENGTH) {
//     formTitle.setCustomValidity('Минимальная длина — 30 символов');
//     colorChange(formTitle);
//     formTitle.reset();
//     return false;
//   }
//   return true;
// };
//
// var splitTitle = function () {
//   var titleForInput = formTitle.value.split('');
//   if (formTitle.value !== '') {
//     validateTitle(titleForInput);
//   } else if (formTitle.value === '') {
//     formTitle.setCustomValidity('Необходимо заполнить это поле!');
//     formTitle.reset();
//     return false;
//   }
//   return true;
// };
//
// submitButton.addEventListener('click', splitTitle);

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
