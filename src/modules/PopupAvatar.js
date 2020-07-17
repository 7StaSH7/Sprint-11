import { Popup } from './Popup';
export class PopupAvatar extends Popup {
    constructor(popupElement, button, avatar, avatarValidator, userAvatar) {
        super(popupElement, button);
        this.avatar = avatar;
        this.userAvatar = userAvatar;
        this.avatarValidator = avatarValidator;
    }

    open() {
        super.open()
        this.avatar.value = "";
        this.button.classList.remove("popup__button_active");
        this.button.setAttribute("disabled", true);
    }

    close() {
        super.close()
        this.avatarValidator.clearErrors();
    }
}