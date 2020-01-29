'use strict';

var map = document.querySelector('.map');
var adsForRent = [{}, {}, {}, {}, {}, {}, {}, {}];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


map.classList.remove('map--faded');

var objects = [ {
    author: {
      avatar: 'img/avatars/user0' + getRandomInt(0, 8) + '.png'
    }
    //offer: {

    //},
    //location: {

    //}
  }
]
