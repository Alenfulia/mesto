
export class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  //Подготовка карточки к публикации
  _getTemplate() {
    const template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return template;
	}

  //Слушатель событий
  _setEventListeners() {
    this._template.querySelector('.element__like-button').addEventListener('click', this._handlerLikeCard);
    this._template.querySelector('.element__button-delete').addEventListener('click', this._handlerDelCard.bind(this));
    this._template.querySelector('.element__image').addEventListener('click',() => this._handleCardClick(this._link, this._name));
  }

  //Генерация карточек
  generateCard() {
    this._template = this._getTemplate();

    const imgPlace = this._template.querySelector('.element__image');
    imgPlace.src = this._link;
    imgPlace.alt = this._name;
    this._template.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();
    return this._template;
  }

 //Лайк карточки
  _handlerLikeCard(evt) {
    evt.target.classList.toggle('element__like-button_active');
  }

  //Удаление карточки
  _handlerDelCard() {
    this._template.remove();
  }

}
