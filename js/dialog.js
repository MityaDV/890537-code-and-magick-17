'use strict';
(function () {

  var setupDialogElement = document.querySelector('.setup'); // нахожу окно настроек
  var dialogHandler = setupDialogElement.querySelector('.upload'); // нахожу аватарку

  // Код перетаскивания предметов

  var draggedArtifact; // создал переменную для хранения перемещаемого элемента

  var onDrag = function () { // ф-я обр-ка перетаскиваемого элемента
  };

  var onDragStart = function (evt) { // ф-я обр-ка начала перетаскивания
    evt.target.style.opacity = '0.5'; // добавил прозрачности элементу

    draggedArtifact = evt.target; // сохранил элемент в переменную
  };

  var onDragEnd = function (evt) { // ф-я обр-ка конца перетаскивания
    evt.target.style.opacity = ''; // сбросил прозрачность перетаскиемого элемента
  };

  var onDragOver = function (evt) { // ф-я обр-ка если элемент находится над своим контейнером
    evt.preventDefault();
  };

  var onDragEnter = function (evt) { // ф-я обр-ка если элемент находится над целевым контейнером
    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.border = '1px solid yellow'; // добавил border
    }
  };

  var onDragLeave = function (evt) { // ф-я обр-ка если элемент убран с целевого контейнера
    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.border = ''; // убрал border
    }
  };

  var onDrop = function (evt) { // ф-я обр-ка если элемент находиться над действительным целевым контейнером
    evt.preventDefault();

    if (evt.target.className === 'setup-artifacts-cell') {
      evt.target.style.border = '';
      draggedArtifact.parentNode.removeChild(draggedArtifact); // удалил элемент из родителя
      evt.target.appendChild(draggedArtifact); // вставил в текущий контейнер
    }
  };

  var shopCell = setupDialogElement.querySelectorAll('.setup-artifacts-cell'); // нашел все ячейки
  [].forEach.call(shopCell, function (cell) { // передаю методу forEach(принимает функцию как вход) массив с ячейками, call принимает первым аргументом shopCell и подставляет его вместо пустого массива, после выполняется function которую передал в forEach и он выполнит её один раз для каждого элемента из массива
    cell.addEventListener('drag', onDrag, false); // навешиваю обработчики
    cell.addEventListener('dragstart', onDragStart, false);
    cell.addEventListener('dragend', onDragEnd, false);
    cell.addEventListener('dragover', onDragOver, false);
    cell.addEventListener('dragenter', onDragEnter, false);
    cell.addEventListener('dragleave', onDragLeave, false);
    cell.addEventListener('drop', onDrop, false);
  });


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
