// Объявление переменных
//Для формы редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');

const popupCloseBtnEdit = popupEditProfile.querySelector('.popup__submit-close');
const profileForm = popupEditProfile.querySelector('.popup__edit-profile-form')
const nameInput = popupEditProfile.querySelector('.popup__input_text_name');
const infoInput = popupEditProfile.querySelector('.popup__input_text_info');

//Для формы добавления карточек
const popupAddCard = document.querySelector('.popup_add-card');
const popupCloseBtnAdd = popupAddCard.querySelector('.popup__submit-close');
const cardForm = popupAddCard.querySelector('.popup__add-card-form')
const cardNameInput = popupAddCard.querySelector('.popup__input_text_card-name');
const cardInfoInput = popupAddCard.querySelector('.popup__input_text_card-link');
const popupOpenBtnAdd = document.querySelector('.profile__add-button');
const popupBtnDisabled = popupAddCard.querySelector('.popup__submit-save');

const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show-image');
const popupImageCloseBtn = popupImage.querySelector('.popup__submit-close');

//Открытие формы
function popupOpen(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupEscHandler);
  document.addEventListener('click', popupOverlayHandler);
}

//Первоначальные значения полей ввода формы редактирования
function popupInputEdit() {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
}

// Закрытие формы
function popupClose(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', popupEscHandler);
  document.removeEventListener('click', popupOverlayHandler);
}

//Закрытие формы при нажатии esc
const popupEscHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    popupClose(openedPopup);
  }
}

//Закрытие формы при нажатии на overlay
const popupOverlayHandler = (evt) => {
  if (evt.target.classList.contains('popup')) {
    popupClose(evt.target);
  }
};

// Обработчик «отправки» формы
function formSubmitHandlerProfile (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
  profileName.textContent  = nameInput.value;
  profileInfo.textContent  = infoInput.value;

  popupClose(popupEditProfile)
}

// Прикрепляем обработчик к форме
popupOpenBtnEdit.addEventListener('click', () => {
  popupInputEdit(); popupOpen(popupEditProfile);
})
popupCloseBtnEdit.addEventListener('click', () => popupClose(popupEditProfile));
profileForm.addEventListener('submit', formSubmitHandlerProfile);

popupOpenBtnAdd.addEventListener('click', () => popupOpen(popupAddCard));
popupCloseBtnAdd.addEventListener('click', () => popupClose(popupAddCard));

popupImageCloseBtn.addEventListener('click', () => popupClose(popupImage));

//Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Создание карточки
const createCard = function(item) {
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.cloneNode(true);
cardElement.querySelector('.element__title').textContent = item.name;
cardElement.querySelector('.element__image').src = item.link;
cardElement.querySelector('.element__image').alt = item.name;

//Лайк карточки
cardElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__like-button_active');
});

//Удаление карточки
  cardElement.querySelector('.element__button-delete').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove();
});

//Открытие изображения
cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
  popupImage.querySelector('.popup__image').src = evt.target.src;
  popupImage.querySelector('.popup__image').alt = item.name;
  popupImage.querySelector('.popup__image-title').textContent = item.name;
  popupOpen(popupImage);
});
  return cardElement;
}

//Добавление массива карточек
function addCards(cards) {
  const listedCard = cards.map(createCard);
  cardsList.prepend(...listedCard);
}

addCards(initialCards);

//Добавление новой карточки
function formAddCardSubmit(evt) {
  evt.preventDefault()
  const newItem = createCard({
    name: cardNameInput.value,
    link: cardInfoInput.value
  });
  cardsList.prepend(newItem);
  popupClose(popupAddCard);
  cardForm.reset();
  popupBtnDisabled.disabled = true;
}

cardForm.addEventListener('submit', formAddCardSubmit);
