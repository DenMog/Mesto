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
const btnClose = document.querySelectorAll('.popup__close-button');
const title = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup__form');
const formElementPhoto = document.querySelector('.popup__form-photo')
const nameInput = document.querySelector('.popup__form-input_name');
const aboutInput = document.querySelector('.popup__form-input_about');
const placeInput = document.querySelector('.popup__form-input_place');
const linkInput = document.querySelector('.popup__form-input_link');
const elements = document.querySelector('.elements');
const popupImg = document.querySelector('.popup_img');
const popupPhoto = popupImg.querySelector('.popup__photo');
const popupCaption = popupImg.querySelector('.popup__caption');
const elementList = document.querySelector('.element-list');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
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

function outputCard( name, link ) {
  
  const elementTemplate = document.querySelector('#element-template').content;
  const elementPlace = elementTemplate.querySelector(".element").cloneNode(true);
  elementPlace.querySelector(".element__image").src = link;
  elementPlace.querySelector(".element__title").textContent = name;
  
  const btnRemove = elementPlace.querySelector(".element__remove");
  btnRemove.addEventListener("click", () => removePhoto(elementPlace));
  elementPlace.querySelector('.element__like-button').addEventListener('click', function (event) {
  event.target.classList.toggle('element__like-button_black');
});
  elementPlace.querySelector(".element__image").addEventListener('click', () => {
  popupPhoto.setAttribute('src', link);
  popupPhoto.setAttribute('alt', name);
  popupCaption.textContent = name;
  openPopup(popupImg)
});
return elementPlace
}

function renderCard (elementList, elementPlace){
  elementList.prepend(elementPlace);
}

const removePhoto = (element) => {
  element.remove()
}

initialCards.forEach((elementPlace) =>
  renderCard(elementList, outputCard(elementPlace.name, elementPlace.link))
);

function submitFormPhotoHandler (event){
  event.preventDefault();
  newPlace = placeInput.value;
  newLink = linkInput.value
  outputCard({
    name: newPlace,
    link: newLink
  })

  closePopup(popupCard);
}

function closePhoto () {
  popupImg.classList.remove('popup_opened')
}

btnClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


formElement.addEventListener('submit', submitFormHandler);
btnEdit.addEventListener('click', openProfilePopup);
formElementPhoto.addEventListener('submit', submitFormPhotoHandler);
btnAdd.addEventListener('click', () => openPopup(popupCard));