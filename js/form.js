'use strict';
(function () {
  var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
  var ALL_PRICES = [0, 1000, 5000, 10000];
  var main = document.querySelector('main');
  var form = document.querySelector('.ad-form');
  var price = form.querySelector('#price');
  var houseType = form.querySelector('#type');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var reset = document.querySelector('.ad-form__reset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var success = successTemplate.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var imageInput = form.querySelector('.ad-form__input');
  var imageHeaderInput = form.querySelector('.ad-form-header__input');
  var error = errorTemplate.cloneNode(true);

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
    } if (evt.target === imageInput) {
      window.validation.validateFileType(imageInput);
    } if (evt.target === imageHeaderInput) {
      window.validation.validateFileType(imageHeaderInput);
    }
  };

  form.addEventListener('change', setOptions);

  var deActivate = function () {
    window.activator.toggle(true);
  };

  var addSuccessWindow = function () {
    main.appendChild(success);
    document.addEventListener('click', deActivate);
    document.addEventListener('keydown', deActivate);
  };

  var addErrorWindow = function () {
    main.appendChild(error);
    document.addEventListener('click', deActivate);
    document.addEventListener('keydown', deActivate);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.send(new FormData(form), addSuccessWindow, addErrorWindow);
  });

  var formReset = function () {
    form.reset();
    window.card.removeOldCard();
  };

  var clearForm = function () {
    formReset();
    form.classList.add('ad-form--disabled');
  };

  var switchToDefault = function () {
    clearForm();
    deActivate();
  };

  reset.addEventListener('click', switchToDefault);

  window.form = {
    clearForm: clearForm,
    deActivate: deActivate
  };

})();
