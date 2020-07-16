import {Popup} from './Popup';
export class PopupImage extends Popup {
  constructor(popupElement, img) {
    super(popupElement);
    this.img = img;
  }
  open(event) {
    const eventTarget = event.target;

    if (eventTarget.classList.contains("place-card__image")) {
      super.open();
      const image = eventTarget.closest(".place-card__image");
      let link = image.style.backgroundImage;
      link = link.substring(5);
      link = link.substring(0, link.length - 2);
      this.img.src = link;
    }
  }
  close(){
    super.close();
  }
}