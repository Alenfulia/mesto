// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelectorAll('.popup__form');

// Функция, которая добавляет класс с ошибкой, передадим текст ошибки вторым параметром
const showInputError = (formElement, element, errorMessage) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  formError.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, element) => {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  formError.classList.remove('popup__input-error_active');
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement,inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку, передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
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
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__submit-save_inactive');
    buttonElement.disabled = true;
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__submit-save_inactive');
    buttonElement.disabled = false;
  }
};

//Добавим слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-save');

  // чтобы проверить состояние кнопки в самом начале
   toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid (formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Функция, которая найдёт и переберёт все формы на странице
function enableValidation(){
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  // Для каждой формы вызовем функцию setEventListeners,передав ей элемент формы
  setEventListeners(formElement);
});
}
enableValidation();
