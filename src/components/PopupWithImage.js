import Popup from './Popup.js';

//Класс, который наследуется от Popup для открытия изображения
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup)
    this._link = this._popup.querySelector('.popup__image')
    this._name = this._popup.querySelector('.popup__image-title')
  }

  //Метод, который перезаписывает родительский метод open
  //в котором нужно вставлять в попап картинку с src изображения и подписью к картинке
  open({ name, link }) {
    super.open()
    this._name.textContent = name;
    this._link.src = link;
    this._link.alt = name
  }
}
