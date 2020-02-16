'use strict';
(function () {
  var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
  var ALL_PRICES = [0, 1000, 5000, 10000];
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var price = form.querySelector('#price');
  var houseType = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var reset = document.querySelector('.ad-form__reset');
  var fieldsets = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('select[class=map__filter]');

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

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var openSuccess = function () {
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var successClickHandler = function () {
      if (success) {
        main.removeChild(success);
        form.reset();
        map.classList.add('map--faded');
        form.classList.add('ad-form--disabled');
        window.helpers.changeMapState(fieldsets, true);
        window.helpers.changeMapState(mapFilters, true);
        var pinElements = document.querySelectorAll('button[type=button]');
        pinElements.forEach(function (element) {
          element.remove();
        });
      }
      document.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', succesKeydownHandler);
    };
    document.addEventListener('click', successClickHandler);
    var succesKeydownHandler = function (evt) {
      window.helpers.isEscEvent(evt, successClickHandler);
    };
    document.addEventListener('keydown', succesKeydownHandler);
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var openError = function () {
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var closeError = function () {
      if (error) {
        main.removeChild(error);
      }
      document.removeEventListener('click', closeError);
      document.removeEventListener('keydown', errorKeydownHandler);
    };

    document.addEventListener('click', closeError);
    var errorKeydownHandler = function (evt) {
      window.helpers.isEscEvent(evt, closeError);
    };
    document.addEventListener('keydown', errorKeydownHandler);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.send(new FormData(form), openSuccess, openError);
  });

  reset.addEventListener('click', function () {
    form.reset();
  });

})();
