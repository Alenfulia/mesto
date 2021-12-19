import Popup from './Popup.js';

//Класс, необходимый для удаления карточки
export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
  }

  //Принимает коллбэк на удаление карточки
  setSubmitAction(action) {
    this._action = action
  }

  //Удаление карточки по нажатию на кнопку подтвердить
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._action();
    })
  }
}
