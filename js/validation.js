'use strict';
(function () {
  var ALL_PRICES = [0, 1000, 5000, 10000];
  var CAPACITY_VALUES = [0, 1, 2, 3];
  var ROOMS_VALUES = [1, 2, 3, 100];
  var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
  var form = document.querySelector('.ad-form');
  var price = form.querySelector('#price');
  var houseType = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  // var formTitle = form.querySelector('input[name=title]');
  // var submitButton = form.querySelector('.ad-form__submit');

  var checkCapacity = function (rooms, guests) {
    if (Number(rooms.value) === ROOMS_VALUES[0] && Number(guests.value) !== CAPACITY_VALUES[1]) {
      capacity.setCustomValidity('Одна комната - один гость');
    } else if (Number(rooms.value) === ROOMS_VALUES[1] && Number(guests.value) !== CAPACITY_VALUES[1] && Number(capacity.value) !== CAPACITY_VALUES[2]) {
      capacity.setCustomValidity('Две комнаты - для одного или двух гостей');
    } else if (Number(rooms.value) === ROOMS_VALUES[2] && Number(guests.value) === CAPACITY_VALUES[0]) {
      capacity.setCustomValidity('3 комнаты — для 3, 2 или для 1 гостя');
    } else if (Number(rooms.value) === ROOMS_VALUES[3] && Number(guests.value) !== CAPACITY_VALUES[0]) {
      capacity.setCustomValidity('100 комнат — не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

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
      checkCapacity(roomNumber, capacity);
    }
  };

  form.addEventListener('change', setOptions);

})();
