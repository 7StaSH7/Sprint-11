class PopupEdit extends Popup {
  constructor(popupElement, button, name, job, userName, userJob, userInfo) {
    super(popupElement, button);
    this.name = name;
    this.job = job;
    this.userName = userName;
    this.userJob = userJob;
    this.userInfo = userInfo;
  }
  open = () => {
    super.open();
    this.name.setCustomValidity("");
    this.job.setCustomValidity("");
    this.userInfo.setUserInfo(this.userName.textContent, this.userJob.textContent);
    this.name.value = this.userInfo.getUserInfo().userInf;
    this.job.value = this.userInfo.getUserInfo().jobInf;
    this.button.removeAttribute("disabled");
    this.button.classList.add("popup__button_active");
  }

  close = () => {
    super.close();
  }
}