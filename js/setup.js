'use strict';

(function () {

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

})();
