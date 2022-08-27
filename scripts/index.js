let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let submitButton = document.querySelector('.popup__submit-button');
let closeButton = document.querySelector('.popup__close-button');
let title = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input_name');
let aboutInput = document.querySelector('.popup__form-input_about');
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = title.textContent;
  aboutInput.value = about.textContent;
}
function closePopup() {
  popup.classList.remove('popup_opened');
}
function formSubmitHandler (event) {
    event.preventDefault();
    title.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);