class UserInfo {
  constructor(userElement, infoElement) {
    this.userElement = userElement;
    this.infoElement = infoElement;
  }

  setUserInfo(userUpdate, infoUpdate) {
    this.user = userUpdate;
    this.info = infoUpdate;
  }

  getUserInfo() {
    return {
      userInf: this.user,
      jobInf: this.info
    }
  }

  updateUserInfo() {
    this.userElement.textContent = this.user;
    this.infoElement.textContent = this.info;
  }
}