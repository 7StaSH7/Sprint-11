import { Popup } from './Popup'
export class PopupCard extends Popup {
  constructor(popupElement, button, title, link, cardValidator) {
    super(popupElement, button);
    this.title = title;
    this.link = link;
    this.cardValidator = cardValidator;
  }
  open() {
    super.open();
    this.title.value = "";
    this.link.value = "";
    this.button.classList.remove("popup__button_active");
    this.button.setAttribute("disabled", true);
  }

  close() {
    super.close();
    this.cardValidator.clearErrors();
  }
}