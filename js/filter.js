'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');

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

  window.filter = {
    getHouseTypeFilter: getHouseTypeFilter
  };

})();
