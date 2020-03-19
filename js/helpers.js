'use strict';
(function () {
  var ESC_KEYCODE = 27;

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

  var showOfflineErrorMessage = function () {
    var errorTemplate = document.querySelector('#error');
    var main = document.querySelector('main');
    var errorMessage = errorTemplate.content.cloneNode(true);
    main.appendChild(errorMessage);
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

  var removeNode = function (successNode, errorNode) {
    if (successNode) {
      successNode.remove();
    } if (errorNode) {
      errorNode.remove();
    }
  };

  window.helpers = {
    getSelectedOption: getSelectedOption,
    changeMapState: changeMapState,
    isEscEvent: isEscEvent,
    showErrorMessage: showErrorMessage,
    removeNode: removeNode,
    showOfflineErrorMessage: showOfflineErrorMessage
  };

})();
