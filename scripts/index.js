import {Card} from './Card.js'
import{validationElements, FormValidator} from './FormValidator.js'
const initialCards = [
  {
    name: 'Абрау-Дюрсо',
    link: './images/Абрау-Дюрсо.jpeg'
  },
  {
    name: 'Ергаки', 
    link: './images/Ергаки.jpeg'
  },
  {
    name: 'Зеленоградск',
    link: './images/Зеленоградск.jpeg'
  },
  {
    name: 'Кападокия',
    link: './images/Кападокия.jpeg'
  },
  {
    name: 'Карелия',
    link: './images/Карелия.jpeg'
  },
  {
    name: 'Кольский п-ов',
    link: './images/Кольский.jpeg'
  }
]; 
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card')
const btnEdit = document.querySelector('.profile__edit-button');
const btnAdd = document.querySelector('.profile__add-button')
const popups = document.querySelectorAll('.popup');
const btnForClosePopup = document.querySelectorAll('.popup__close-button');
const title = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const formElementPhoto = document.querySelector('.popup__form-photo')
const nameInput = document.querySelector('.popup__form-input_name');
const aboutInput = document.querySelector('.popup__form-input_about');
const placeInput = document.querySelector('.popup__form-input_place');
const linkInput = document.querySelector('.popup__form-input_link');
// const elements = document.querySelector('.elements');
const popupImg = document.querySelector('.popup_img');
const popupPhoto = popupImg.querySelector('.popup__photo');
const popupCaption = popupImg.querySelector('.popup__caption');
const formValidators = {};
const elementList = document.querySelector('.element-list');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closEsc);
}

function openProfilePopup() {
  nameInput.value = title.textContent;
  aboutInput.value = about.textContent;
  openPopup(popupProfile)
}

function submitFormHandler (event) {
    event.preventDefault();
    title.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    closePopup(popupProfile);
}

function outputCard( card ) {
//   const elementPlace = elementTemplate.querySelector(".element")
  // .cloneNode(true);
  // elementPlace.querySelector(".element__image").src = link;
  // elementPlace.querySelector(".element__image").alt = name;
  // elementPlace.querySelector(".element__title").textContent = name;
  
  // const btnRemove = elementPlace.querySelector(".element__remove");
  // btnRemove.addEventListener("click", () => removePhoto(elementPlace));
//   elementPlace.querySelector('.element__like-button').addEventListener('click', function (event) {
//   event.target.classList.toggle('element__like-button_black');
// });
elementTemplate.querySelector(".element__image").addEventListener('click', () => {
  popupPhoto.setAttribute('src', link);
  popupPhoto.setAttribute('alt', name);
  popupCaption.textContent = name;
  openPopup(popupImg)
});
// return elementPlace
const newCard = new Card(card, elementTemplate, outputCard);
const newCardElement = newCard.generateCard();
return newCardElement;
}


function renderCard (elementList, elementPlace){
  elementList.prepend(elementPlace);
}

// const removePhoto = (element) => {
//   element.remove()
// }

initialCards.forEach((card) =>
  renderCard(elementList, outputCard(card))
);

function submitFormPhotoHandler (event){
  event.preventDefault();
  renderCard(elementList, 
  outputCard(placeInput.value, linkInput.value)
)
  placeInput.value = "";
  linkInput.value = "";
  closePopup(popupCard);

  // disableButton(
  //   { disabledSubmitButtonClass: "popup__submit-button_none" },
  //   formElementPhoto.querySelector(".popup__submit-button")
  // );
}

btnForClosePopup.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function closEsc(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

popups.forEach((item) =>
  item.addEventListener("click", (event) => {
    closePopup(event.target);
  })
);

function validation(validationElements) {
  const formList = Array.from(document.querySelectorAll(validationElements.formSelector));

  formList.forEach((form) => {
    const newFormValidator = new FormValidator(validationElements, form);
    newFormValidator.enableValidation();
    formValidators[form.getAttribute('name')] = newFormValidator;
  });
}

validation(validationElements);
formElement.addEventListener('submit', submitFormHandler);
btnEdit.addEventListener('click', openProfilePopup);
formElementPhoto.addEventListener('submit', submitFormPhotoHandler);
btnAdd.addEventListener('click', () => openPopup(popupCard));


