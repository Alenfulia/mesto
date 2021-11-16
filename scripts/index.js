import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";


const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');

const popupCloseBtnEdit = popupEditProfile.querySelector('.popup__submit-close');
const profileForm = popupEditProfile.querySelector('.popup__edit-profile-form')
const nameInput = popupEditProfile.querySelector('.popup__input_text_name');
const infoInput = popupEditProfile.querySelector('.popup__input_text_info');

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


//Открытие формы
const popupOpen = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', popupEscHandler);
  document.addEventListener('click', popupOverlayHandler);
}

//Добавление массива карточек
const formAddCard = (item) => {
  const data = { ...item, popupOpen };
  const newCard = new Card (data, '#card-template');
  const placeElem = newCard.generateCard();
  cardsList.prepend(placeElem);
};

initialCards.forEach(formAddCard);

//Первоначальные значения полей ввода формы редактирования
const popupInputEdit = () => {
  nameInput.value = profileName.textContent;
  infoInput.value = profileInfo.textContent;
}

//Добавление новой карточки
const formAddCardSubmit = (evt) => {
  evt.preventDefault();
  const newItem = {
    name: cardNameInput.value,
    link: cardInfoInput.value,
  };
  formAddCard(newItem);
  evt.target.reset();
  popupClose(popupAddCard);
  popupBtnDisabled.disabled = true;
}


// Закрытие формы
const popupClose = (popup)  => {
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

// Сохранение данных профиля из формы
const formSubmitHandlerProfile = (evt)  => {
  evt.preventDefault();
  profileName.textContent  = nameInput.value;
  profileInfo.textContent  = infoInput.value;

  popupClose(popupEditProfile);
}

// Прикрепляем обработчики к форме
popupOpenBtnEdit.addEventListener('click', () => {
  popupInputEdit(); popupOpen(popupEditProfile);
});
popupCloseBtnEdit.addEventListener('click', () => popupClose(popupEditProfile));
profileForm.addEventListener('submit', formSubmitHandlerProfile);

popupOpenBtnAdd.addEventListener('click', () => popupOpen(popupAddCard));
popupCloseBtnAdd.addEventListener('click', () => popupClose(popupAddCard));

popupImageCloseBtn.addEventListener('click', () => popupClose(popupImage));
cardForm.addEventListener('submit', formAddCardSubmit);

//Включение валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-save',
  inactiveButtonClass: 'popup__submit-save_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error'
};

const editFormValidation = new FormValidator(validationConfig, profileForm);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(validationConfig, cardForm);
addFormValidation.enableValidation();
