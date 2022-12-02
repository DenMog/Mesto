export const validationElements = {
    formSelector: ".form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__submit-button",
    disabledSubmitButtonClass:"popup__submit-button_none",
    invalidImputClass: "popup__form-input_error",
    errorInputClass: "popup__form-input-error_show"
};

export class FormValidator {
    constructor(validationElements, form) {
      this._validationElements = validationElements;
      this._form = form;
      this._inputList = Array.from(this._form.querySelectorAll(this._validationElements.inputSelector));
      this._buttonElement = this._form.querySelector(this._validationElements.submitButtonSelector);
    }

    _findErrorElement(inputElement) {
        return this._form.querySelector(`.input-error-${inputElement.name}`);
      }

    _showInputError(inputElement, errorMessage) {
        const inputError = this._findErrorElement(inputElement);
        inputElement.classList.add(this._validationElements.invalidImputClass);
        inputError.textContent = errorMessage;
        inputError.classList.add(this._validationElements.errorInputClass);
    }

    _hideInputError(inputElement) {
        const inputError = this._findErrorElement(inputElement);
        inputElement.classList.remove(this._validationElements.invalidImputClass);
        inputError.classList.remove(this._validationElements.errorInputClass);
        inputError.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    }

    _disableButton() {
        this._buttonElement.classList.add(this._validationElements.disabledSubmitButtonClass);
        this._buttonElement.disabled = true;
      }

     _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }

      _toggleButtonState() {
        if (this._hasInvalidInput()) {
          this._disableButton();
        } else {
            this._buttonElement.classList.remove(this._validationElements.disabledSubmitButtonClass);
            this._buttonElement.disabled = false;
        }
}
    resetValidation() {
        this._disableButton();
        this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        inputElement.value = '';
         });
     }
           
    enableValidation() {
         this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
         this._checkInputValidity(inputElement);
         this._toggleButtonState(this._inputList, this._buttonElement);
            });
        });
    }
}
