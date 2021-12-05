import "../pages/index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import { popupEditProfile,
         popupOpenBtnEdit,
         profileName,
         profileInfo,
         profileForm,
         nameInput,
         infoInput,
         popupAddCard,
         cardForm,
         popupOpenBtnAdd,
         cardListElement,
         popupImage,
         validationConfig
        } from "../utils/constants.js";


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

  editFormValidation.resetValidation();
  formProfile.open();

}

popupOpenBtnEdit.addEventListener('click', openProfilePopup);

// Сохранение данных профиля из формы
const formProfile = new PopupWithForm({
  popup: popupEditProfile,
  submitProfileForm: (data) => {
    popupInputEdit.setUserInfo(data.name, data.info);
    formProfile.close();
  },
});

formProfile.setEventListeners();
//-------------------------------------------------------------------------

//Сохранение данных формы
const popupNewCardForm = new PopupWithForm({
  popup: popupAddCard,
  submitProfileForm: (data) => {
  const item = {
    name: data.card_name,
    link: data.card_link
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
  addFormValidation.resetValidation();
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
