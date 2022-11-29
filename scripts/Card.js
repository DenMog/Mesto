export class Card{
    constructor(data, templateSelector, outputCard) {
        this._name = data.name;
        this._link = data.link;
        this._elementTemplate = templateSelector;
        this._outputCard = outputCard
      }

      _getTemplate() {
        return this._elementTemplate.cloneNode(true);
      }

      _setEventListeners() {
        this._likeButton = this._element.querySelector('.element__like-button');
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton.addEventListener('click', () => {
          this._handleLikeClick();
        });
    
        this._element.querySelector('.element__remove').addEventListener('click', () => {
          this._handleElementRemove();
        });
    
        this._element.querySelector('.element__image').addEventListener('click', () => {
          this._outputCard(this._name, this._link);
        });
      }

      _handleLikeClick() {
        this._likeButton.classList.toggle('element__like-button_black');
      }

      _handleElementRemove() {
        this._element.remove();
      }

      generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__title').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        return this._element;
      }
}