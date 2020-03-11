'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('.map__features');
  var wifi = featuresFilter.querySelector('#filter-wifi');
  var dishwasher = featuresFilter.querySelector('#filter-dishwasher');
  var parking = featuresFilter.querySelector('#filter-parking');
  // var washer = featuresFilter.querySelector('#filter-washer');
  // var elevator = featuresFilter.querySelector('#filter-elevator');
  // var conditioner = featuresFilter.querySelector('#filter-conditioner');
  // var filters = document.querySelector('.map__filters');

  // var valueToAnotherValue = {
  //   'flat': 'flat',
  //   'bungalo': 'bungalo',
  //   'house': 'house',
  //   'palace': 'flat'
  // } СПРОСИТЬ

  var filterReset = function () {
    window.card.removeOldCard();
    window.data.removePins();
  };

  // var houseArray = [];
  // var roomsArray = [];
  // var pricesArray = []; СПРОСИТЬ

  var filterByHouseType = function (pin) {
    if (houseTypeFilter.value === 'any') {
      return pin.offer.type;
    }
    return houseTypeFilter.value === pin.offer.type;
  };


  var filterByRoomsQuantity = function (pin) {
    if (roomsFilter.value === 'any') {
      return pin.offer.rooms;
    }
    return Number(roomsFilter.value) === pin.offer.rooms;
  };

  var filterByNumberOfGuests = function (pin) {
    if (guestsFilter.value === 'any') {
      return pin.offer.guests;
    }
    return Number(guestsFilter.value) === pin.offer.guests;
  };

  var filterByPrice = function (pin) {
    if (featuresFilter.value === 'low') {
      return pin.offer.price < 10000;
    } if (priceFilter.value === 'middle') {
      return pin.offer.price >= 10000 && pin.offer.price < 50000;
    } if (priceFilter.value === 'high') {
      return pin.offer.price >= 50000;
    }
    return pin.offer.price;
  };

  var filterByFeatures = function (pin) {
    if (wifi.checked) {
      return pin.offer.features.includes('wifi');
    } if (dishwasher.checked) {
      return pin.offer.features.includes('dishwasher');
    } if (parking.checked) {
      return pin.offer.features.includes('parking');
    }
    return pin.offer.features;
  };


  var applyFilters = function (data) {
    return data.filter(function (offer) {
      return (filterByHouseType(offer) && filterByRoomsQuantity(offer) && filterByPrice(offer) && filterByNumberOfGuests(offer) && filterByFeatures(offer));
    });
  };

  window.filter = {
    applyFilters: applyFilters,
    filterReset: filterReset
  };
})();
