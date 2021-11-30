import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../components/Utils.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";


const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__description');

const profileForm = popupEditProfile.querySelector('.popup__edit-profile-form')
const nameInput = popupEditProfile.querySelector('.popup__input_text_name');
const infoInput = popupEditProfile.querySelector('.popup__input_text_info');

const popupAddCard = document.querySelector('.popup_add-card');
const cardForm = popupAddCard.querySelector('.popup__add-card-form')
const cardNameInput = popupAddCard.querySelector('.popup__input_text_card-name');
const cardInfoInput = popupAddCard.querySelector('.popup__input_text_card-link');
const popupOpenBtnAdd = document.querySelector('.profile__add-button');

const cardListElement = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show-image');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-save',
  inactiveButtonClass: 'popup__submit-save_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error'
};

//Включение валидации
const editFormValidation = new FormValidator(validationConfig, profileForm);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(validationConfig, cardForm);
addFormValidation.enableValidation();

//Первоначальные значения полей ввода формы редактирования
const popupInputEdit = new UserInfo({
  userName: profileName,
  userInfo: profileInfo
})

//Попап редактирования профиля
const openProfilePopup = () => {
  const data = popupInputEdit.getUserInfo();
  nameInput.value = data.userNameValue;
  infoInput.value = data.userInfoValue;

  formProfile.open()
}

popupOpenBtnEdit.addEventListener('click', openProfilePopup);

// Сохранение данных профиля из формы
const formProfile = new PopupWithForm({
  popup: popupEditProfile,
  submitProfileForm: () => {
    popupInputEdit.setUserInfo(nameInput, infoInput);
    formProfile.close();
  },
});

formProfile.setEventListeners();
//-------------------------------------------------------------------------

//Сохранение данных формы
const popupNewCardForm = new PopupWithForm({
  popup: popupAddCard,
  submitProfileForm: () => {
    const item = {
      name: cardNameInput.value,
      link: cardInfoInput.value,
    };
    const newCard = createCard(item);
    cardsList.addNewItem(newCard);
    popupNewCardForm.close();
  },
});

popupNewCardForm.setEventListeners();

//Попап с картинкой
const openImage = new PopupWithImage(popupImage);
openImage.setEventListeners();



//Попап добавления карточки
function openCardPopup () {
  popupNewCardForm.open();
}
popupOpenBtnAdd.addEventListener('click', openCardPopup);

//Добавление карточек
const createCard = (item) => {
  const card = new Card({
    data: item,
    handleCardClick: () => {
      openImage.open(item)
    }
  }, '#card-template');
  const createdCardElement = card.generateCard();
  return createdCardElement;
}

//Добавление массива карточек
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const element = createCard(item)
      cardsList.addItem(element)
    }
  }, cardListElement)
cardsList.renderItems()
