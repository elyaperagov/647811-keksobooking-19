'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var featuresFilter = document.querySelector('.map__features');
  var filters = document.querySelector('.map__filters');

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

  // var houseArray = [];
  // var roomsArray = [];
  // var pricesArray = [];

  var filterByHouseType = function (pin) {
    // houseArray = offer.filter(function (pin) {
      if (houseTypeFilter.value === 'any') {
        return pin.offer.type;
      }
      console.log(houseTypeFilter.value === pin.offer.type);
    // });
  };

  var getHouseTypeFilter = function (offer) {
    houseTypeFilter.addEventListener('change', function () {
      filterByHouseType(offer);
      filterReset(houseArray);
    });
  };

  var filterByRoomsQuantity = function (pin) {
    // roomsArray = offer.filter(function (pin) {
      if (roomsFilter.value === 'any') {
        return pin.offer.rooms;
      }
      return Number(roomsFilter.value) === pin.offer.rooms;
    // });
  };

  var getRoomsFilter = function (offer) {
    roomsFilter.addEventListener('change', function () {
      filterByRoomsQuantity(offer);
      filterReset(roomsArray);
    });
  };

  var filterByPrice = function (pin) {
    // pricesArray = offer.filter(function (pin) {
      if (priceFilter.value === 'low') {
        return pin.offer.price < 10000;
      } if (priceFilter.value === 'middle') {
        return pin.offer.price >= 10000 && pin.offer.price < 50000;
      } if (priceFilter.value === 'high') {
        return pin.offer.price >= 50000;
      }
      return pin.offer.price;
    // });
  };

  var getPriceFilter = function (offer) {
    priceFilter.addEventListener('change', function () {
      filterByPrice(offer);
      filterReset(pricesArray);
    });
  };

  function applyFilters(data) {
    return data
      .filter(function (offer) {
        return (
          filterByHouseType(offer) &&
          filterByRoomsQuantity(offer) &&
          filterByPrice(offer)
        );
        filterReset(offer);
      });
  }



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

  window.filter = {
    getHouseTypeFilter: getHouseTypeFilter,
    getPriceFilter: getPriceFilter,
    getRoomsFilter: getRoomsFilter,
    applyFilters: applyFilters
    // getFeaturesFilter: getFeaturesFilter
  };
})();
