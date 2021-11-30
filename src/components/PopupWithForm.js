import Popup from './Popup.js';

//Класс, который наследуется от Popup и сохраняет данные формы
export default class PopupWithForm extends Popup {
  constructor({ popup, submitProfileForm }) {
    super(popup)
    this.submitProfileForm = submitProfileForm
    this._form = this._popup.querySelector('.popup__form')
  }

  //Приватный метод, который собирает данные всех полей формы
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._inputValues = {}
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value
    })
    return this._inputValues
  }

  //Метод, который добавляет обработчик клика иконке закрытия, и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.submitProfileForm(this._getInputValues())
    })
  }

  //Метод, который закрывает форму и сбрасывает данные в ней
  close() {
    super.close()
    this._form.reset()
  }
}
