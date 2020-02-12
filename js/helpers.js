'use strict';
(function () {

  var getRandomArray = function (arr) {
    var number = getRandomInteger(1, arr.length);
    var arrItems = [];
    for (var i = 0; i < number; i++) {
      arrItems.push(arr[i]);
    }
    return arrItems;
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomNumber = function (number) {
    return Math.floor(Math.random() * (number + 1));
  };

  var getRandomElement = function (array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
  };

  var getSelectedOption = function (object) {
    var objectOptions = object.querySelectorAll('option');
    for (var i = 0; i < objectOptions.length; i++) {
      if (objectOptions[i].selected) {
        var selectedOption = i;
      }
    }
    return selectedOption;
  };

  window.helpers = {
    getRandomArray: getRandomArray,
    getRandomInteger: getRandomInteger,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getSelectedOption: getSelectedOption
  };

})();
