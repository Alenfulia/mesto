// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-save',
  inactiveButtonClass: 'popup__submit-save_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error'
};

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelectorAll('.popup__form');

// Функция, которая добавляет класс с ошибкой, передадим текст ошибки вторым параметром
const showInputError = (formElement, element, errorMessage, config) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add(config.errorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  formError.classList.add(config.inputErrorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, element, config) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove(config.errorClass);
  // Скрываем сообщение об ошибке
  formError.classList.remove(config.inputErrorClass);
  // Очистим ошибку
  formError.textContent = '';
};

//Функция, которая найдёт и переберёт все формы на странице
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы
  setEventListeners(formElement, validationConfig);
});
}

// Функция, которая проверяет валидность поля
const isValid = (formElement,inputElement,config) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку, передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};

// Функция настройки статуса кнопки
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

//Добавим слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
   toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid (formElement, inputElement, config);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

enableValidation(validationConfig);
