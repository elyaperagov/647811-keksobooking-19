'use strict';
(function () {
  var CAPACITY_VALUES = [0, 1, 2, 3];
  var ROOMS_VALUES = [1, 2, 3, 100];
  var capacity = document.querySelector('#capacity');

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

  var validateFileType = function (input) {
    var fileName = input.value;
    var idxDot = fileName.lastIndexOf('.') + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (['jpg', 'jpeg', 'png'].includes(extFile)) {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity('Можно загружать только изображение');
      input.value = '';
    }
  };

  window.validation = {
    checkCapacity: checkCapacity,
    validateFileType: validateFileType
  };

})();
