import "../pages/index.css";
import Api from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

import { popupEditProfile,
         popupOpenBtnEdit,
         profileName,
         profileInfo,
         profileForm,
         profileAvatar,
         editAvatar,
         buttonEditAvatar,
         popupAvatarProfile,
         nameInput,
         infoInput,
         popupAddCard,
         cardForm,
         popupOpenBtnAdd,
         cardListElement,
         popupImage,
         delCardPopup,
         validationConfig
        } from "../utils/constants.js";

let userId;

// api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
    headers: {
    authorization: '6a01cc4c-f1ea-4aa3-9e48-7802fcbe7643',
    'Content-Type': 'application/json'
  }
});

// Загрузка готовых карточек и данных о пользователе с сервера
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//------------------------------------------------------------------------------
//Включение валидации форм
const editFormValidation = new FormValidator(validationConfig, profileForm);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(validationConfig, cardForm);
addFormValidation.enableValidation();
const editAvatarValidation = new FormValidator(validationConfig, editAvatar);
editAvatarValidation.enableValidation();
//------------------------------------------------------------------------------

//---------------------Данные пользователя--------------------------------------

//Первоначальные значения полей ввода формы редактирования
const userInfo = new UserInfo({
  username: profileName,
  userinform: profileInfo,
  avatar: profileAvatar
})

// Создание попапа с формой редактирования профиля
const formProfile = new PopupWithForm({
  popup: popupEditProfile,
  handleFormSubmit: (dataForm) => {
    formProfile.loading(true);
    api.editUserInfo(dataForm)
      .then((dataForm) => {
        userInfo.setUserInfo(dataForm);
        formProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        formProfile.loading(false);
      });
  }
});

formProfile.setEventListeners();

//Открытие попапа редактирования профиля
function openProfilePopup ({ username, userinform }) {
  nameInput.value = username;
  infoInput.value = userinform
}

//Обработчик нажатия кнопки вызова попапа редактирвоания профиля
popupOpenBtnEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  openProfilePopup({
    username: info.username,
    userinform: info.userinform
  });
  editFormValidation.resetValidation();
  formProfile.open();
});

//Создание попапа изменения аватара пользователя
const editAvatarPopup = new PopupWithForm({
  popup: popupAvatarProfile,
  handleFormSubmit: (data) => {
    editAvatarPopup.loading(true);
    api.editAvatar(data)
      .then((data) => {
        avatar.src = data.avatar;
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.loading(false);
      });
  }
});
editAvatarPopup.setEventListeners();

// Обработчик нажатия кнопки изменения аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  editAvatarPopup.open();
  editAvatarValidation.resetValidation();
});

//-------------------------------------------------------------------------

//----------------Карточки с изображениями---------------------------------

//Добавление карточек
const createCard = (data) => {
  const card = new Card({
    data: data,
    templateSelector: '#card-template',
    userId: userId,
    handleCardClick: (name, link) => {
      openImage.open(name, link);
    },
    handleDelCardClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.setSubmitAction(() => {
        api.deleteCard(cardId)
          .then(() => {
            deleteCardPopup.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDelLike: (cardId) => {
      api.deleteLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });
  const createdCardElement = card.generateCard();
  return createdCardElement;
};

//Добавление массива карточек
const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, cardListElement);


//Создание попапа с формой добавления новой карточки
const popupNewCardForm = new PopupWithForm({
  popup: popupAddCard,
  handleFormSubmit: (formData) => {
    popupNewCardForm.loading(true);
    api.addCard(formData)
    .then((formData) => {
      cardsList.addItem(createCard(formData));
      popupNewCardForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupNewCardForm.loading(false);
    });
}
});

popupNewCardForm.setEventListeners();

//Обработчик нажатия на кнопку добавления новой карточки
popupOpenBtnAdd.addEventListener('click',() => {
  addFormValidation.resetValidation();
  popupNewCardForm.open();
})

//Попап с картинкой в полный размер
const openImage = new PopupWithImage(popupImage);
openImage.setEventListeners();

//Попап удаления карточки
const deleteCardPopup = new PopupWithConfirmation(delCardPopup);
deleteCardPopup.setEventListeners();
