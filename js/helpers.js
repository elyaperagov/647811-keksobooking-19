'use strict';
(function () {
  var ESC_KEYCODE = 27;
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

  var changeMapState = function (object, newState) {
    for (var i = 0; i < object.length; i++) {
      object[i].disabled = newState;
    }
  };

  var isEscEvent = function (evt, arg) {
    if (evt.keyCode === ESC_KEYCODE) {
      arg();
    }
  };

  var showErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.helpers = {
    getRandomArray: getRandomArray,
    getRandomInteger: getRandomInteger,
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getSelectedOption: getSelectedOption,
    changeMapState: changeMapState,
    isEscEvent: isEscEvent,
    showErrorMessage: showErrorMessage
  };

})();
