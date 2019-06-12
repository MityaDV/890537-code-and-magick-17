/* eslint-disable no-redeclare */
'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон']; // массив имён
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']; // массив фамилий
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)']; // массив цвета мантии
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green']; // массив цвета глаз

var userDialog = document.querySelector('.setup'); // находим окно настроек пользователя
userDialog.classList.remove('hidden'); // показываем окно настроек пользователя

var similarListElement = document.querySelector('.setup-similar-list'); // находим блок куда будем копировать магов

var similarWizardTemplate = document.querySelector('#similar-wizard-template') // находим шаблон который будем копировать
.content
.querySelector('.setup-similar-item');

// массив объектов с именами магов и цветами мантий и глаз
var wizards = [];

// Функция генерации объектов

var generateObjects = function (names, surname, coat, eyes) {
  return {
    name: names[Math.floor(Math.random() * names.length)] + ' ' + surname[Math.floor(Math.random() * surname.length)],
    coatColor: coat[Math.floor(Math.random() * coat.length)],
    eyesColor: eyes[Math.floor(Math.random() * eyes.length)]
  };
};
// Добавляем четыре объекта
for (var i = 0; i < 4; i++) {
  wizards[i] = generateObjects(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COATS, WIZARD_EYES);
}

// функция создания магов
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // записали в переменную клонирование шаблона

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // находим в клонах шаблона текст имен и заменяем их
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // меняем цвет плащей
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // меняем цвет глаз

  return wizardElement; // возвращаем изменённого мага
};

var fragment = document.createDocumentFragment(); // создаём фрагмент

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i])); // добавляем в фрагмент на каждой итерации вызов ф-и для создания магов
}
similarListElement.appendChild(fragment); // добавляем в блок для вставки подготовленный фрагмент

userDialog.querySelector('.setup-similar').classList.remove('hidden'); // показываем блок с похожими персонажами
