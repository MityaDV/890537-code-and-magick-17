'use strict';
(function () {

  var setupDialogElement = document.querySelector('.setup'); // нахожу окно настроек
  var dialogHandler = setupDialogElement.querySelector('.upload'); // нахожу аватарку
  var setupArtifactShop = setupDialogElement.querySelector('.setup-artifacts-shop');
  var setupArtifactBox = setupDialogElement.querySelector('.setup-artifacts');
  var boxCell = setupArtifactBox.querySelectorAll('.setup-artifacts-cell');

  // Код перетаскивания предметов

  var onMouseDownArtifact = function (downEvt) { // вешаю обработчик на контейнер с элементами
    var shopElem = downEvt.target.closest('img'); // сохраняю ближайший элемент от текущего

    boxCell[0].appendChild(shopElem);
  };

  setupArtifactShop.addEventListener('mousedown', onMouseDownArtifact);

  // Код перетаскивания окна

  dialogHandler.addEventListener('mousedown', function (evt) { // добавил обработчик нажатия кнопки мышки
    evt.preventDefault(); // отменил действия по умолчанию

    var startCoords = { // записал в объект начальные координаты
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false; // добавил флаг для отмены загрузки фото

    var onMouseMove = function (moveEvt) { // создал функцию-обработчик перемещения мышки
      moveEvt.preventDefault(); // отменил действия по умолчанию
      dragged = true;

      var shift = { // записал в объект вычисление зачения координат при смещении
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // перезаписали новые координаты
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px'; // вычисляем координату окна настроек по y, отнимая из её координаты относительно родидельского блока - разницу координат аватарки при смещении
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px'; // то же по x
    };

    var onMouseUp = function (upEvt) { // создал функцию-обработчик при отпускании кнопки
      upEvt.preventDefault(); // отменил действия по умолчанию

      document.removeEventListener('mousemove', onMouseMove); // удаляю обработчик нажатия на кнопку мышки
      document.removeEventListener('mouseup', onMouseUp); // удаляю обработчик при отпускании кнопки

      if (dragged) { // добавил условие если перетаскиваем окно отменяем 'click'
        var onClickPreventDefault = function (dragEvt) { // создал функцию-обработчик для отмены 'click'
          dragEvt.preventDefault(); // отменить действие по умолчанию
          dialogHandler.removeEventListener('click', onClickPreventDefault); // удалить сразу этот обработчик
        };

        dialogHandler.addEventListener('click', onClickPreventDefault); // добавил обработчик
      }
    };

    document.addEventListener('mousemove', onMouseMove); // добавил обработчик перемещению окна
    document.addEventListener('mouseup', onMouseUp); // добавил обработчик отпускания кнопки после перемещения
  });

})();
