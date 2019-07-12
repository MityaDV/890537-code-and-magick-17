'use strict';

(function () {

  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  window.wizard = {
    onEyesChange: function (_color) {},
    onCoatChange: function (_color) {}
  };

  var getRandomElement = function (array) { // ф-я получения случайного элемента массива
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var wizardElement = document.querySelector('.setup-wizard'); //  нахожу блок с настройками волшебника

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat'); // нашёл элемент с цветом плаща
  wizardCoatElement.addEventListener('click', function (evtCoat) {

    var newColor = getRandomElement(COAT_COLORS);

    evtCoat.target.style.fill = newColor; // назначил новый цвет

    window.wizard.onCoatChange(newColor);
  });

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes'); // нашёл элемент с цветом глаз

  wizardEyesElement.addEventListener('click', function (evtEyes) {

    var newColor = getRandomElement(EYES_COLORS);

    evtEyes.target.style.fill = newColor;

    window.wizard.onEyesChange(newColor);
  });

})();
