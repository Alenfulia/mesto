import Popup from './Popup.js';

//Класс, необходимый для открытия изображения
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupName = this._popup.querySelector('.popup__image-title')
  }

  //Метод, который перезаписывает родительский метод open
  //в котором нужно вставлять в попап картинку с src изображения и подписью к картинке
  open ( name, link ) {
    super.open();
    this._popupImage.src = link;
    this._popupName.textContent = name;
    this._popupImage.alt = name
  }
}
