class Popup {

  constructor(popupElement, button) {
    this.popupElement = popupElement;
    this.button = button;
  }

  open() {
    this.popupElement.classList.add("popup_is-opened");
  }

  close() {
    this.popupElement.classList.remove("popup_is-opened");
  }

  closeEsc(event) {
    if (event.key === "Escape") {
      if (this.popupElement.classList.contains("popup_is-opened")) 
        this.close();  
    }
  }
}
