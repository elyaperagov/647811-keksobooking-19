'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var adTemplate = document.querySelector('#card').content.querySelector('.map__card');

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
        return 'Неизвестный типа жилья';
    }
  };

  var addFeatures = function (node, feature) {
    var cardFeatures = node.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < feature.length; i++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + feature[i];
      fragment.appendChild(featureItem);
    }
    cardFeatures.appendChild(fragment);
  };

  var photoTemplate = document.querySelector('#card').content.querySelector('.popup__photo');

  var addPhotos = function (node, photos) {
    var popupPhotos = node.querySelector('.popup__photos');
    while (popupPhotos.firstChild) {
      popupPhotos.firstChild.remove();
    }
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var photoItem = photoTemplate.cloneNode(true);
      photoItem.src = photos[i];
      fragment.appendChild(photoItem);
    }
    popupPhotos.appendChild(fragment);
  };


  var removeOldCard = function () {
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  var removePinActiveClass = function () {
    var allPins = map.querySelectorAll('.map__pin');
    allPins.forEach(function (it) {
      if (it.classList.contains('map__pin--active')) {
        it.classList.remove('map__pin--active');
      }
    });
  };

  var renderCards = function (card) {
    removeOldCard();
    var element = adTemplate.cloneNode(true);
    element.querySelector('.popup__title').textContent = card.offer.title;
    element.querySelector('.popup__text--address').textContent = card.offer.address;
    element.querySelector('.popup__text--price').textContent = card.offer.price + 'р/ночь';
    element.querySelector('.popup__type').textContent = getHouseType(card.offer.type);
    element.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    element.querySelector('.popup__description').textContent = card.offer.description;
    element.querySelector('.popup__photos').src = addPhotos(element, card.offer.photos);
    element.querySelector('.popup__avatar').src = card.author.avatar;
    element.querySelector('.popup__feature').textContent = addFeatures(element, card.offer.features);
    map.insertBefore(element, map.querySelector('.map__filters-container'));
    var popupClose = element.querySelector('.popup__close');

    var closePopup = function () {
      removeOldCard();
      removePinActiveClass();
      popupClose.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', cardKeydownHandler);
    };

    popupClose.addEventListener('click', closePopup);

    var cardKeydownHandler = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closePopup();
      }
    };
    document.addEventListener('keydown', cardKeydownHandler);
  };


  window.card = {
    renderCards: renderCards,
    removePinActiveClass: removePinActiveClass,
    removeOldCard: removeOldCard
  };
})();
