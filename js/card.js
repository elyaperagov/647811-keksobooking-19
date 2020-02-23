'use strict';
(function () {
  var adTemplate = document.querySelector('#card').content.querySelector('.map__card');
  // var filter = document.querySelector('.map__filters-container');
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

  // var FeaturesClassMap = {
  //   'wifi': 'popup__feature--wifi',
  //   'dishwasher': 'popup__feature--dishwasher',
  //   'parking': 'popup__feature--parking',
  //   'washer': 'popup__feature--washer',
  //   'elevator': 'popup__feature--elevator',
  //   'conditioner': 'popup__feature--conditioner'
  // }; !! СПРОСИТЬ КАК ПРОЧИТАТЬ ЗНАЧЕНИЕ ИЗ ЭТОГО ОБЪЕКТА И ДОБАВИТЬ В card.offer.features!!!

  var getFeaturesClass = function (feature) {
    switch (feature) {
      case 'wifi':
        return 'popup__feature--wifi';
      case 'dishwasher':
        return 'popup__feature--dishwasher';
      case 'parking':
        return 'popup__feature--parking';
      case 'washer':
        return 'popup__feature--washer';
      case 'elevator':
        return 'popup__feature--elevator';
      case 'conditioner':
        return 'popup__feature--conditioner';
      default:
        throw new Error('Неизвестный тип удобства: «' + feature + '»');
    }
  };

  var addFeatures = function (node, features) {
    var cardFeatures = node.querySelector('.popup__features');
    cardFeatures.innerHTML = ''; // КАК УДАЛИТЬ ВСЕ ДОЧЕРНИЕ ЭЛЕМЕНТЫ ЧЕРЕЗ removeChild?;
    for (var i = 0; i < features.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature';
      featureItem.classList.add(getFeaturesClass(features[i]));
      cardFeatures.appendChild(featureItem);
    }
  };

  var addPhotos = function (node, photos) {
    var popupPhotos = node.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    for (var i = 0; i < photos.length; i++) {
      var photoItem = document.createElement('img');
      photoItem.className = 'popup__photo';
      photoItem.width = 45;
      photoItem.height = 40;
      photoItem.alt = 'Фотография жилья';
      photoItem.src = photos[i];
      popupPhotos.appendChild(photoItem);
    }
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
    element.querySelector('.popup__photos').src = addPhotos(element, card.offer.photos);
    element.querySelector('.popup__avatar').src = card.author.avatar;
    element.querySelector('.popup__feature').textContent = addFeatures(element, card.offer.features);
    return element;
    // filter.insertAdjacentHTML('afterbegin', element);
  };

  window.card = {
    renderCards: renderCards
  };
})();
