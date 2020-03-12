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

  // var wifi = featuresFilter.querySelector('#filter-wifi');
  // var dishwasher = featuresFilter.querySelector('#filter-dishwasher');
  // var parking = featuresFilter.querySelector('#filter-parking');
  // var washer = featuresFilter.querySelector('#filter-washer');
  // var elevator = featuresFilter.querySelector('#filter-elevator');
  // var conditioner = featuresFilter.querySelector('#filter-conditioner');
  // var filters = document.querySelector('.map__filters');

  // var valueToAnotherValue = {
  //   'flat': 'flat',
  //   'bungalo': 'bungalo',
  //   'house': 'house',
  //   'palace': 'flat'
  // } СПРОСИТЬ как прочитать значения из этого объекта

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

  // var filterCheckboxes = Array.from(featuresFilter.querySelectorAll('input:checked');

  // var filterByFeatures = function (pin) {
  //   filterCheckboxes.forEach(function (element) {
  //     if (element.checked)
  //     return pin.offer.features.includes(element.value);
  //     // console.log(element.checked)
  //   })
  // }

  var filterByFeatures = function (pin) {
    var filteredCheckboxes = Array.from(featuresFilter.querySelectorAll('input:checked')); // почему не работает если объявить за пределами функции?
    return filteredCheckboxes.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });
  };

  // var filterByFeatures = function (pin) {
  //   var result;
  //     if (wifi.checked) {
  //     result = pin.offer.features.includes('wifi');
  //   } if (dishwasher.checked) {
  //     result = pin.offer.features.includes('dishwasher');
  //   } if (parking.checked) {
  //     result = pin.offer.features.includes('parking');
  //   }
  //   return result;
  // }


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
