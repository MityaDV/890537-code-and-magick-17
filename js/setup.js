'use strict';

(function () {

  var WIZARDS_COUNT = 4;
  var coord; // для сохранения координат при первом открытии окна диалога

  var userDialog = document.querySelector('.setup'); // находим окно настроек пользователя
  var setupOpen = document.querySelector('.setup-open'); // ноходим окно с аватаркой
  var setupClose = userDialog.querySelector('.setup-close'); // находим кнопку закрытия
  var setupUserName = userDialog.querySelector('.setup-user-name'); // находим поле ввода имени

  var onPopupEscPress = function (evt) { // вынесли и назвали обработчик события нажатия клавиши ESC для удобства его добавления и удаления
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () { // вынесли в отдельную ф-ю логику открытия окна
    userDialog.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress); // добавили обработчик события 'keydown' для закрытия окна по нажатию ESC
    coord = window.util.isDefineCoordsOffset(userDialog);
  };

  var closePopup = function () { // вынесли в отдельную ф-ю логику закрытия окна
    userDialog.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress); // удалили обработчик события 'keydown' для закрытия окна по нажатию ESC
    userDialog.style.left = coord.x;
    userDialog.style.top = coord.y;
  };

  setupOpen.addEventListener('click', function () { // добавили обработчик события 'click' на аватарку
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) { // добавили обработчик события 'keydown' на аватарку если она в фокусе и нажат ENTER
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () { // добавили обработчик события 'click' на кнопку закрытия
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) { // добавили обработчик события 'keydown' на кнопку закрытия если она в фокусе и нажат ENTER
    window.util.isEnterEvent(evt, closePopup);
  });

  setupUserName.addEventListener('focus', function () { // удаляю обработчик esc при фокусе
    document.removeEventListener('keydown', onPopupEscPress);
  });

  setupUserName.addEventListener('blur', function () { // возвращаю обработчик esc если фокус убран
    document.addEventListener('keydown', onPopupEscPress);
  });

  // module6-task1

  var similarListElement = userDialog.querySelector('.setup-similar-list'); // находим блок куда будем копировать магов
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content; // находим шаблон который будем копировать

  var renderWizard = function (wizard) { // функция создания магов
    var wizardElement = similarWizardTemplate.cloneNode(true); // записали в переменную клонирование шаблона

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // находим в клонах шаблона текст имен и меняем их
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat; // меняем цвет плащей
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes; // меняем цвет глаз

    return wizardElement; // возвращаем изменённого мага
  };

  var onSuccessLoad = function (wizards) { // вынес в переменную функцию обработки успешной загрузки
    var fragment = document.createDocumentFragment(); // создаём фрагмент

    var shuffledWizards = wizards.sort(function () { // перемешиваю полученный массив волшебников
      return Math.random() - 0.5;
    });

    for (var j = 0; j < WIZARDS_COUNT; j++) {
      fragment.appendChild(renderWizard(shuffledWizards[j])); // добавляем в фрагмент на каждой итерации вызов ф-и для создания магов
    }

    similarListElement.appendChild(fragment); // добавляем в блок для вставки подготовленный фрагмент

    userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
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

    window.backendSave(new FormData(form), function (_response) { // вызов при отправке данных

      userDialog.classList.add('hidden');
    }, onErrorLoad);

    evt.preventDefault();
  });

  window.backendLoad(onSuccessLoad, onErrorLoad); // вызов для получения данных

})();
