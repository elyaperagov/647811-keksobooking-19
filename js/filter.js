'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');
  // var priceFilter = document.querySelector('#housing-price');
  // var roomsFilter = document.querySelector('#housing-rooms');
  // var featuresFilter = document.querySelector('.map__features');

  // var valueToAnotherValue = {
  //   'flat': 'flat',
  //   'bungalo': 'bungalo',
  //   'house': 'house',
  //   'palace': 'flat'
  // }

  var filterReset = function (filteredPins) {
    window.card.removeOldCard();
    window.data.removePins();
    window.data.drawPins(filteredPins);
  };

  var offersOfType = [];

  var filterByHouseType = function (offer) {
    offersOfType = offer.filter(function (pin) {
      if (houseTypeFilter.value === 'any') {
        return pin.offer.type;
      }
      return houseTypeFilter.value === pin.offer.type;
    });
  };

  var getHouseTypeFilter = function (offer) {
    houseTypeFilter.addEventListener('change', function () {
      filterByHouseType(offer);
      filterReset(offersOfType);
    });
  };

  window.filter = {
    getHouseTypeFilter: getHouseTypeFilter,
    // getPriceFilter: getPriceFilter,
    // getRoomsFilter: getRoomsFilter
    // getFeaturesFilter: getFeaturesFilter
  };
})();
