//Класс, который отвечает за вид и функциональность карточки
export class Card {
  constructor({ data, handleCardClick, templateSelector, userId, handleDelCardClick, handleSetLike, handleDelLike }) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDelCardClick = handleDelCardClick;
    this._likes = data.likes;
    this._handleSetLike = handleSetLike;
    this._handleDelLike = handleDelLike;
  }

  //Подготовка карточки к публикации (получение шаблона карточки)
  _getTemplate() {
    this._template = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return this._template;
	}

  //Генерация карточек
  generateCard() {
    this._element = this._getTemplate();

    this._imgPlace = this._element.querySelector('.element__image');
    this._imgPlace.src = this._link;
    this._imgPlace.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._likeBtn = this._element.querySelector('.element__like-button');
    this._likesNumber = this._element.querySelector('.element__likes-number');
    this._deleteBtn = this._element.querySelector('.element__button-delete');
    this._hasDelBtn();
    this._isCardLiked();
    this._likesNumber.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }

   //Удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

    //Проверка на наличие лайка
  _isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeBtn.classList.add('element__like-button_active');
    }
  }

  // поставить/удалить лайк, изменение количества лайков
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesNumber.textContent = this._likes.length;
    this._likeBtn.classList.toggle('element__like-button_active');
  }

  // Проверка владельца карточки (убираем кнокпу удаления с неё)
  _hasDelBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._deleteBtn.remove();
    }
  }

  //Слушатель событий карточки
  _setEventListeners() {
    this._imgPlace.addEventListener('click',() => this._handleCardClick(this._name, this._link));
    this._deleteBtn.addEventListener('click', () => this._handleDelCardClick(this._cardId));
    this._likeBtn.addEventListener('click', () => {
      if (this._likeBtn.classList.contains('element__like-button_active')) {
        this.handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    })
  }
}
