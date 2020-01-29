'use strict';
var map = document.querySelector('.map');
var propertyType = ['palace', 'flat', 'house', 'bungalo'];
var propertyPrice = {
  MINIMUM: 15,
  MAXIMUM: 200
};
var propertyRooms = {
  MINIMUM: 1,
  MAXIMUM: 10
};
var propertyGuests = {
  MINIMUM: 1,
  MAXIMUM: 10
};
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var propertyFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var propertyPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']

var unfadeMap = function () {
  map.classList.remove('map--faded');
}

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

var generateObjects = function (quantity) {
  var offers = [];
  for (var i = 0; i < quantity; i++) {
    var title = 'заголовок предложения';
    var positionX = getRandomNumber(map.clientWidth);
    var positionY = getRandomInt(130, 630);
    var price = getRandomInt(propertyPrice.MINIMUM, propertyPrice.MAXIMUM);
    var rooms = getRandomInt(propertyRooms.MINIMUM, propertyRooms.MAXIMUM);
    var features = arrayRandElement(propertyFeatures);
    var guests = getRandomInt(propertyGuests.MINIMUM, propertyGuests.MAXIMUM);
    var checkin = arrayRandElement(CHECKIN);
    var checkout = arrayRandElement(CHECKOUT);
    var avatarIndex = i;
    var type = arrayRandElement(propertyType);
    var description = 'строка с описанием';
    var photos = arrayRandElement(propertyPhotos);

  var object = {
    'author': {
      avatar: 'img/avatars/user0' + (avatarIndex + 1) + '.png'
    },
    'offer': {
        'title': title,
        'address': positionX + ', ' + positionY,
        'price': price,
        'rooms': rooms,
        'features': features,
        'guests': guests,
        'checkin': checkin,
        'checkout': checkout,
        'type': type,
        'description': description,
        'photos': photos
      },
      'location': {
        'x': positionX,
        'y': positionY
      }
    }
  // Array.prototype.push.apply(offers, object);  как?
    offers.push(object);

  };
  //console.log(offers);
}


generateObjects(8);
unfadeMap();
