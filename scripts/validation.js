const showInputError = (config, formElement,inputElement, validationMessage) => {
    const errorElement = formElement.querySelector(`.input-error-${inputElement.name}`)
    inputElement.classList.add(config.invalidImputClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(config.errorInputClass);
}

const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.input-error-${inputElement.name}`)
    inputElement.classList.remove(config.invalidImputClass)
    errorElement.classList.remove(config.errorInputClass);
    errorElement.textContent = ""
}

const disableButton = (config, formSubmitButtonElement) => {
    formSubmitButtonElement.classList.add(config.disabledButtonClass);
    formSubmitButtonElement.disabled = true
}

const toggleButtonState = (config, inputs, formSubmitButtonElement) =>{
    if(hasInvalidInput(inputs)){disableButton(config, formSubmitButtonElement);
    } else {
    formSubmitButtonElement.classList.remove(config.disabledSubmitButtonClass);
    formSubmitButtonElement.disabled = false
    }
}

const chekInputValidity = (config, formElement, inputElement) => {
    if(inputElement.validity.valid) {
        hideInputError(config, formElement, inputElement);
    } else {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    }
}
 
const hasInvalidInput = (inputs) =>{
    return inputs.some((inputElement) => !inputElement.validity.valid)
}

const handleFormInput = (config, formElement) => {
    const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
    const formSubmitButtonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(config, inputs, formSubmitButtonElement);
    inputs.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            chekInputValidity(config, formElement, inputElement);
            toggleButtonState(config, inputs, formSubmitButtonElement);
        })
    })
};

const enableValidation = (config) => {
    const forms = Array.from(document.querySelectorAll(config.formSelector))
    forms.forEach((formElement)=>{handleFormInput(config,formElement)})
}

enableValidation ({
    formSelector: ".form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__submit-button",
    disabledSubmitButtonClass:"popup__submit-button_none",
    invalidImputClass: "popup__form-input_error",
    errorInputClass: "popup__form-input-error_show"
});