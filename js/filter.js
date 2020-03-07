'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var featuresFilter = document.querySelector('.map__features');

  var getFeaturesFilter = function (offer) {
    featuresFilter.addEventListener('change', function () {
      var offersOfType = offer.filter(function (pin) {
        // console.log(pin.offer.features);
      });
      window.data.removePins();
      window.card.removeOldCard();
      window.data.drawPins(offersOfType);
    });
  };

  var getHouseTypeFilter = function (offer) {
    houseTypeFilter.addEventListener('change', function () {
      var offersOfType = offer.filter(function (pin) {
        if (houseTypeFilter.value === 'flat') {
          return pin.offer.type === 'flat';
        } if (houseTypeFilter.value === 'bungalo') {
          return pin.offer.type === 'bungalo';
        } if (houseTypeFilter.value === 'house') {
          return pin.offer.type === 'house';
        } if (houseTypeFilter.value === 'palace') {
          return pin.offer.type === 'palace';
        }
        return pin.offer.type;
      });
      window.data.removePins();
      window.card.removeOldCard();
      window.data.drawPins(offersOfType);
    });
  };

  var getPriceFilter = function (offer) {
    priceFilter.addEventListener('change', function () {
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
      window.data.removePins();
      window.card.removeOldCard();
      window.data.drawPins(offersOfType);
    });
  };

  var getRoomsFilter = function (offer) {
    roomsFilter.addEventListener('change', function () {
      var offersOfType = offer.filter(function (pin) {
        if (roomsFilter.value === '1') {
          return pin.offer.rooms === 1;
        } if (roomsFilter.value === '2') {
          return pin.offer.rooms === 2;
        } if (roomsFilter.value === '3') {
          return pin.offer.rooms === 3;
        }
        return pin.offer.rooms;
      });
      window.data.removePins();
      window.card.removeOldCard();
      window.data.drawPins(offersOfType);
    });
  };

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
    getFeaturesFilter: getFeaturesFilter
  };

})();
