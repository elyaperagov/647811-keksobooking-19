'use strict';
(function () {
  var Price = {
    MIN: 10000,
    MAX: 50000
  };

  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var featuresFilter = document.querySelector('.map__features');
  var houseType = {
    'flat': 'flat',
    'bungalo': 'bungalo',
    'house': 'house',
    'palace': 'palace'
  };

  var filterReset = function () {
    window.card.removeOldCard();
    window.data.removePins();
  };

  var filterByHouseType = function (pin) {
    if (houseTypeFilter.value === 'any') {
      return pin.offer.type;
    }
    return houseType[houseTypeFilter.value] === pin.offer.type;
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
    switch (priceFilter.value) {
      case 'low':
        return pin.offer.price < Price.MIN;
      case 'middle':
        return pin.offer.price >= Price.MIN && pin.offer.price <= Price.MAX;
      case 'high':
        return pin.offer.price > Price.MAX;
      case 'any':
      default:
        return pin.offer.price;
    }
  };

  var filterByFeatures = function (pin) {
    var filteredCheckboxes = Array.from(featuresFilter.querySelectorAll('input:checked'));
    return filteredCheckboxes.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
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
