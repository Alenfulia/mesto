import Popup from './Popup.js';

//Класс, который сохраняет данные формы
export default class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._form.querySelector('.popup__submit-save');
    this._submitBtnText = this._submitBtn.textContent;
  }

  //Получаем данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  //Обработчик клика иконки закрытия и сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {

      this._handleFormSubmit(this._getInputValues());
    })
  }

  //Закрытие формы и сброс данных в ней
  close() {
    super.close();
    location.reload();
    this._form.reset()
  }

  //Изменение состояния кнопки во время загрузки
  loading(isLoading) {
    if (isLoading) {
      this._submitBtn.textContent = 'Сохранение...'
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
