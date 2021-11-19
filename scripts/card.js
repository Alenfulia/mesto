
import {popupImage, popupImageSrc, popupImageText} from "./utils.js";

export class Card {
  constructor(data, selector) {
    this._popupOpen = data.popupOpen;

    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  //Подготовка карточки к публикации
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
	}

 //Лайк карточки
  _handlerLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  //Удаление карточки
  _handlerDelCard() {
    this._element.remove();
  }

  //Открытие изображения
   _handlerOpenImgCard(evt) {
    this._popupOpen(popupImage);
    popupImageSrc.src = this._link;
    popupImageSrc.alt = this._name;
    popupImageText.textContent = this._name;
  }

  //Слушатель событий
  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', this._handlerLikeCard);
    this._element.querySelector('.element__button-delete').addEventListener('click', this._handlerDelCard.bind(this));
    this._element.querySelector('.element__image').addEventListener('click', (evt) => this._handlerOpenImgCard(evt));
  }

  //Генерация карточек
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imgPlace = this._element.querySelector('.element__image');
    imgPlace.src = this._link;
    imgPlace.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
