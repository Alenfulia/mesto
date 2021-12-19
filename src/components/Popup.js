//Класс, который отвечает за открытие и закрытие попапа
export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  //Открытие попапа
  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose);
  }

  //Закрытие попапа
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Закрытие попапа клавишей Esc
  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  //Слушатель клика иконки закрытия попапа, и нажатия на overlay
  setEventListeners() {
    this._popup.querySelector('.popup__submit-close').addEventListener('click', () => this.close());
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close()
      }
    })
  }
}
