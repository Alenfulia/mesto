// Находим форму в DOM
let popup = document.querySelector('.popup'); // Воспользуйтесь методом querySelector()
let popupOpen = document.querySelector('.profile__edit-button')
let popupClose = popup.querySelector('.popup__submit-close')
let formElement = document.querySelector('.popup__form')

let profileName = document.querySelector('.profile__name'); // Воспользуйтесь инструментом .querySelector()
let profileJob = document.querySelector('.profile__description');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_text_name');
let jobInput = document.querySelector('.popup__input_text_info');

//Открытие формы
function popupToggle() {
  popup.classList.toggle('popup_opened')
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}
// Обработчик «отправки» формы,хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  let nameValue = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  let jobValue = jobInput.value; // Выберите элементы, куда должны быть вставлены значения полей

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue; // Вставьте новые значения с помощью textContent
  popupToggle()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupOpen.addEventListener('click', popupToggle);
popupClose.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);
