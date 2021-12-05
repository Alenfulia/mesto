export class FormValidator {
  constructor(validationConfig, formElement){
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    this._inputsList = formElement.querySelectorAll(validationConfig.inputSelector);
  }

  // Добавление класса с ошибкой, отображение сообщения об ошибке
  _showInputError(errorElement, inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Удаление класса с ошибкой, скрытие сообщения об ошибке
  _hideInputError (errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  // Проверка валидности поля и настройка статуса кнопки
  _isValid = (inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)

    if (isInputNotValid) {
      this._showInputError(errorElement, inputElement);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }

  // Метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState = (isActive) => {
    if (isActive) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  //Добавим слушатель событий всем полям ввода внутри формы
  _setEventListeners = () => {
    const isFormValid = this._formElement.checkValidity();
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(isFormValid);

    Array.from(this._inputsList).forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        const isFormValid = this._formElement.checkValidity();
        this._isValid (inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(isFormValid);
      });
    });
  };


  // Метод включения валидации (найдет и переберёт все формы на странице)
  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }


  // Сброс полей
  resetValidation() {
    this._toggleButtonState(false);

    this._inputsList.forEach((inputElement) => {
      this._hideInputError(this._formElement.querySelector(`.${inputElement.id}-error`), inputElement)
    });
  }
}

