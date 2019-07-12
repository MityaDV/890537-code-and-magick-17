'use strict';

(function () {

  var WIZARDS_COUNT = 4;

  var userDialog = document.querySelector('.setup'); // находим окно настроек пользователя
  var similarListElement = userDialog.querySelector('.setup-similar-list'); // находим блок куда будем копировать магов
  var wizardTemplate = document.querySelector('#similar-wizard-template'); // находим шаблон который будем копировать

  var renderWizard = function (wizard) { // функция создания магов
    var wizardElement = wizardTemplate.content.cloneNode(true); // записали в переменную клонирование шаблона

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // находим в клонах шаблона текст имен и меняем их
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // меняем цвет плащей
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; // меняем цвет глаз

    return wizardElement; // возвращаем изменённого мага
  };

  window.render = function (data) { // функция добавления волшебников с приходящего массива с сервера
    var takeNumber = data.length > WIZARDS_COUNT ? WIZARDS_COUNT : data.length; // условие добавления четырёх волшебников
    similarListElement.innerHTML = ''; // очищаю блок для вставки волшебников

    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i])); // создаю и вставляю не больше четырёх волшебников
    }

    userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываю блок с похожими персонажами
  };

})();
