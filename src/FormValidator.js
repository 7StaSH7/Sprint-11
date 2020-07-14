class FormValidator {
  constructor(form, button, errors) {
    this.button = button;
    this.form = form;
    this.errors = errors;
  }

  isValidate(input) {
    input.setCustomValidity("");
    if (input.validity.valueMissing) {
      input.setCustomValidity("Это обязательное поле");
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity("Должно быть от 2 до 30 символов");
      return false;
    }

    if (input.type === "url" && input.validity.typeMismatch) {
      input.setCustomValidity("Здесь должна быть сслыка");
      return false;
    }

    return input.checkValidity();
  }

  checkInputValidity = (input) => {
    const error = this.form.querySelector(`.${input.name}-error`);
    const valid = this.isValidate(input);
    error.textContent = input.validationMessage;
    return valid;
  }

  clearErrors() {
    this.errors.forEach(error => error.textContent = "");
  }

  renderLoading(isLoading, initialTextContent) {
    if (isLoading) {
      this.button.textContent = "Загрузка...";
    }
    else {
      this.button.textContent = initialTextContent;
    }
  }


  setSubmitButtonState() {
    if (this.form.checkValidity()) {
      this.button.classList.add("popup__button_active");
      this.button.removeAttribute("disabled");
    }
    else {
      this.button.classList.remove("popup__button_active");
      this.button.setAttribute("disabled", true);
    }

  }

  setEventListeners() {
    this.form.addEventListener("input", (event) => {
      this.checkInputValidity(event.target);
      this.setSubmitButtonState();
    })
  }

}