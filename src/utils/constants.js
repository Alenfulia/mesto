
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupOpenBtnEdit = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');

export const profileForm = popupEditProfile.querySelector('.popup__edit-profile-form')
export const nameInput = popupEditProfile.querySelector('.popup__input_text_name');
export const infoInput = popupEditProfile.querySelector('.popup__input_text_info');

export const popupAvatarProfile = document.querySelector('.popup_edit-avatar');
export const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
export const editAvatar = document.querySelector('.popup__edit-avatar');
export const delCardPopup = document.querySelector('.popup_del-card');
export const buttonDeleteCard = document.querySelector('.element__button-delete');

export const popupAddCard = document.querySelector('.popup_add-card');
export const cardForm = popupAddCard.querySelector('.popup__add-card-form')
export const cardNameInput = popupAddCard.querySelector('.popup__input_text_card-name');
export const cardInfoInput = popupAddCard.querySelector('.popup__input_text_card-link');
export const popupOpenBtnAdd = document.querySelector('.profile__add-button');
export const popupClose = document.querySelector('.popup__submit-close');

export const cardListElement = document.querySelector('.elements__list');
export const popupImage = document.querySelector('.popup_show-image');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-save',
  inactiveButtonClass: 'popup__submit-save_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__input_type_error'
};

//Массив карточек
export const initialCards = [
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
