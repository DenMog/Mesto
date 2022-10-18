let popup = document.querySelector('.popup');
let popupCard = document.querySelector('.popup_card')
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button')
let submitButton = document.querySelector('.popup__submit-button');
let closeButton = document.querySelector('.popup__close-button');
let popupCardClose = document.querySelector('.popup_card-close-button')
let title = document.querySelector('.profile__title');
let about = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let formElementPhoto = document.querySelector('.popup__form-photo')
let nameInput = document.querySelector('.popup__form-input_name');
let aboutInput = document.querySelector('.popup__form-input_about');
let placeInput = document.querySelector('.popup__form-input_place');
let linkInput = document.querySelector('.popup__form-input_link');
let elements = document.querySelector('.elements');
const popupImg = document.querySelector('.popup_img');
const popupPhoto = popupImg.querySelector('.popup__photo');
const popupCaption = popupImg.querySelector('.popup__caption');

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
const elementList = document.querySelector('.element-list');
const elementTemplate = document.querySelector('#element-template').content;
const cardPlace = initialCards.map (function(item) {
  return {
    name: item.name,
    link: item.link
  };
});
function output() {
  cardPlace.forEach(outputCard);
}
function outputCard({ name, link }) {
  const elementPlace = elementTemplate.querySelector(".element").cloneNode(true);
  elementPlace.querySelector(".element__image").src = link;
  elementPlace.querySelector(".element__title").textContent = name;
  elementList.prepend(elementPlace);

const removeBtn = elementPlace.querySelector(".element__remove");
  removeBtn.addEventListener("click", () => removePhoto(elementPlace));
  elementPlace.querySelector('.element__like-button').addEventListener('click', function (event) {
  event.target.classList.toggle('element__like-button_black');


});
elementPlace.addEventListener('click', () => {
  popupPhoto.setAttribute('src', link);
  popupCaption.textContent = name;
  popupImg.classList.add('popup_opened');
})}
output();



const removePhoto = (element) => {
  element.remove()
}

function openPopupCard () {
  popupCard.classList.add('popup_opened')
  
}
function closePopupCard() {
popupCard.classList.remove('popup_opened');
}
function formPhotoSubmitHandler (event){
  event.preventDefault();
  newPlace = placeInput.value;
  newLink = linkInput.value
  outputCard({
    name: newPlace,
    link: newLink
  })

  closePopupCard();
}
formElementPhoto.addEventListener('submit', formPhotoSubmitHandler);
addButton.addEventListener('click', openPopupCard)
popupCardClose.addEventListener('click', closePopupCard)

const closePhoto = popupImg.querySelector('.popup_img-close-button');
function photoClose () {
  popupImg.classList.remove('popup_opened')
}
closePhoto.addEventListener('click', photoClose )



