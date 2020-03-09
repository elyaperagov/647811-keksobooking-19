'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
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

  var filterByHouseType = function (offer) {
    var offersOfType = offer.filter(function (pin) {
      if (houseTypeFilter.value === 'any') {
        return pin.offer.type;
      }
      return houseTypeFilter.value === pin.offer.type;
    });
    filterReset(offersOfType);
  };

  var getHouseTypeFilter = function (offer) {
    houseTypeFilter.addEventListener('change', function () {
      filterByHouseType(offer);
    });
  };

  var filterByRoomsQuantity = function (offer) {
    var offersOfType = offer.filter(function (pin) {
      if (roomsFilter.value === 'any') {
        return pin.offer.rooms;
      }
      return Number(roomsFilter.value) === pin.offer.rooms;
    });
    filterReset(offersOfType);
  };

  var getRoomsFilter = function (offer) {
    roomsFilter.addEventListener('change', function () {
      filterByRoomsQuantity(offer);
    });
  };

  var filterByPrice = function (offer) {
    var offersOfType = offer.filter(function (pin) {
      if (priceFilter.value === 'low') {
        return pin.offer.price < 10000;
      } if (priceFilter.value === 'middle') {
        return pin.offer.price >= 10000 && pin.offer.price < 50000;
      } if (priceFilter.value === 'high') {
        return pin.offer.price >= 50000;
      }
      return pin.offer.price;
    });
    filterReset(offersOfType);
  };

  var getPriceFilter = function (offer) {
    priceFilter.addEventListener('change', function () {
      filterByPrice(offer);
    });
  };

  // var getFeaturesFilter = function (offer) {
  //   featuresFilter.addEventListener('change', function () {
  //     var offersOfType = offer.filter(function (pin) {
  //       // console.log(pin.offer.features);
  //     });
  //     filterReset(offersOfType);
  //   });
  // };

  // function filterItems() {
  //   let filtered = [];
  //
  //   filtered = filtered.concat(items.filter((item) => {
  //     if (state['s'] && item.size === 's') {
  //         return item;
  //     }
  //   }))
  //
  //   filtered = filtered.concat(items.filter((item) => {
  //     if (state['m'] && item.size === 'm') {
  //         return item;
  //     }
  //   }))
  //
  //   filtered = filtered.concat(items.filter((item) => {
  //     if (state['l'] && item.size === 'l') {
  //         return item;
  //     }
  //   }))
  //
  //   return filtered;
  // }

  // var filterAllOptions = function (evt) {
  //   if (evt.target === houseTypeFilter) {
  //     filterByHouseType(offer);
  //   } if (evt.target === roomsFilter) {
  //     filterByRoomsQuantity(offer);
  //   }
  // };

  window.filter = {
    getHouseTypeFilter: getHouseTypeFilter,
    getPriceFilter: getPriceFilter,
    getRoomsFilter: getRoomsFilter
    // getFeaturesFilter: getFeaturesFilter
  };
})();
