'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open'); // ноходим окно с аватаркой
var userDialog = document.querySelector('.setup'); // находим окно настроек пользователя
var setupClose = userDialog.querySelector('.setup-close'); // находим кнопку закрытия
var similarListElement = document.querySelector('.setup-similar-list'); // находим блок куда будем копировать магов
var similarWizardTemplate = document.querySelector('#similar-wizard-template') // находим шаблон который будем копировать
  .content
  .querySelector('.setup-similar-item');

var onPopupEscPress = function (evt) { // вынесли и назвали обработчик события нажатия клавиши ESC для удобства его добавления и удаления
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () { // вынесли в отдельную ф-ю логику открытия окна
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress); // добавили обработчик события 'keydown' для закрытия окна по нажатию ESC
};

var closePopup = function () { // вынесли в отдельную ф-ю логику закрытия окна
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress); // удалили обработчик события 'keydown' для закрытия окна по нажатию ESC
};

setupOpen.addEventListener('click', function () { // добавили обработчик события 'click' на аватарку
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) { // добавили обработчик события 'keydown' на аватарку если она в фокусе и нажат ENTER
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () { // добавили обработчик события 'click' на кнопку закрытия
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) { // добавили обработчик события 'keydown' на кнопку закрытия если она в фокусе и нажат ENTER
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var randomValueFromArray = function (array) { // Функция генерации случайного значения из переданного массива
  return array[Math.floor(Math.random() * array.length)];
};

var wizards = []; // массив объектов с именами, цветами мантий, глаз магов

var generateWizardObject = function () { // Функция генерации объектов
  return {
    name: randomValueFromArray(WIZARD_NAMES) + ' ' + randomValueFromArray(WIZARD_SURNAMES),
    coatColor: randomValueFromArray(WIZARD_COATS),
    eyesColor: randomValueFromArray(WIZARD_EYES)
  };
};

for (var i = 0; i < WIZARDS_COUNT; i++) { // Добавляем четыре объекта
  wizards[i] = generateWizardObject();
}

var renderWizard = function (wizard) { // функция создания магов
  var wizardElement = similarWizardTemplate.cloneNode(true); // записали в переменную клонирование шаблона

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // находим в клонах шаблона текст имен и меняем их
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // меняем цвет плащей
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // меняем цвет глаз

  return wizardElement; // возвращаем изменённого мага
};

var fragment = document.createDocumentFragment(); // создаём фрагмент

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j])); // добавляем в фрагмент на каждой итерации вызов ф-и для создания магов
}
similarListElement.appendChild(fragment); // добавляем в блок для вставки подготовленный фрагмент

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
