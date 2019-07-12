'use strict';

(function () {

  var userDialog = document.querySelector('.setup'); // находим окно настроек пользователя

  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSuccessLoad = function (data) { // вынес в переменную функцию обработки успешной загрузки
    wizards = data; // сохранил массив который пришёл с сервера
    updateWizards();
  };

  var onErrorLoad = function (errorMessage) { // вынес в переменную функцию обработки ошибок загрузки
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var form = userDialog.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {

    window.backend.save(new FormData(form), function (_response) { // вызов при отправке данных

      userDialog.classList.add('hidden');
    }, onErrorLoad);

    evt.preventDefault();
  });

  window.backend.load(onSuccessLoad, onErrorLoad); // вызов для получения данных
})();
