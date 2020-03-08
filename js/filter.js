'use strict';
(function () {
  var houseTypeFilter = document.querySelector('#housing-type');

  // var valueToAnotherValue = {
  //   'flat': 'flat',
  //   'bungalo': 'bungalo',
  //   'house': 'house',
  //   'palace': 'flat'
  // }
  var filterByHouseType = function (offer) {
    var offersOfType = offer.filter(function (pin) {
      if (houseTypeFilter.value === 'any') {
        return pin.offer.type;
      }
      return houseTypeFilter.value === pin.offer.type;
    });
    window.card.removeOldCard();
    window.data.removePins();
    window.data.drawPins(offersOfType);
  };

  var getHouseTypeFilter = function (offer) {
    houseTypeFilter.addEventListener('change', function () {
      filterByHouseType(offer);
    });
  };

  window.filter = {
    getHouseTypeFilter: getHouseTypeFilter
  };
})();
