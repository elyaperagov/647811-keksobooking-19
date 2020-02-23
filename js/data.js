'use strict';
(function () {
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // var filter = map.querySelector('.map__filters-container');

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

  var getHouseType = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      default:
        throw new Error('Неизвестный тип жилья: «' + type + '»');
    }
  };


  var FeaturesClassMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };


  var renderCards = function (card) {
    var element = adTemplate.cloneNode(true);
    element.querySelector('.popup__title').textContent = card.offer.title;
    element.querySelector('.popup__text--address').textContent = card.offer.address;
    element.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    element.querySelector('.popup__type').textContent = getHouseType(card.offer.type);
    element.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    element.querySelector('.popup__description').textContent = card.offer.description;
    // element.querySelector('.popup__photos').src = card.offer.photos;
    element.querySelector('.popup__avatar').src = card.author.avatar;

    var cardFeatures = element.querySelector('.popup__features');
    // console.log(cardFeatures);

    // var featuresList = cardFeatures.children;
    // console.log(featuresList);

    var addFeatures = function (feature) {
      for (var i = 0; i < feature.length; i++) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature';
        featureItem.classList.add(FeaturesClassMap[feature]);
        cardFeatures.appendChild(featureItem);
      }
    };
    element.querySelector('.popup__feature').textContent = addFeatures(card.offer.features);
    return element;
  };

  var drawPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderTemplate(array[i]));
    }
    fragment.appendChild(renderCards(array[0]));
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
