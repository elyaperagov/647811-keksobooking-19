'use strict';
(function () {
  var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
  var ALL_PRICES = [0, 1000, 5000, 10000];
  var form = document.querySelector('.ad-form');
  var price = form.querySelector('#price');
  var houseType = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var setOptions = function (evt) {
    if (evt.target === houseType) {
      price.min = ALL_PRICES[window.helpers.getSelectedOption(houseType)];
      price.placeholder = price.min;
    } if (evt.target === timeIn) {
      timeOut.value = BOOKING_TIMES[window.helpers.getSelectedOption(timeIn)];
      timeOut.placeholder = timeOut.value;
    } if (evt.target === timeOut) {
      timeIn.value = BOOKING_TIMES[window.helpers.getSelectedOption(timeOut)];
      timeIn.placeholder = timeIn.value;
    } if (evt.target === roomNumber || evt.target === capacity) {
      window.validation.checkCapacity(roomNumber, capacity);
    }
  };

  form.addEventListener('change', setOptions);

})();
