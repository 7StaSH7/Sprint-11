(function () {
  const config = {
    url: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: 'b16b8885-3d1d-48d1-bc1a-f6964c7b092b',
      'Content-Type': 'application/json'
    }
  }
  const formNew = document.forms.new;
  const formEdit = document.forms.edit;
  const formAvatar = document.forms.avatar;
  const api = new Api(config);
  const { avatar } = formAvatar.elements;
  const { title, link } = formNew.elements; 
  const { name, job } = formEdit.elements;
  const addButton = document.querySelector(".user-info__button");
  const addPlaceButton = document.querySelector(".popup__button");
  const closeButton = document.querySelector(".popup__close");
  const closeEditButton = document.querySelector(".popup-edit__close");
  const closeAvatarButton = document.querySelector(".popup-avatar__close");
  const closeImageButton = document.querySelector(".popup-image__close");
  const editButton = document.querySelector(".user-info__edit-button");
  const saveButton = document.querySelector(".popup-edit__button");
  const saveAvatarButton = document.querySelector(".popup-avatar__button");
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const userAvatar = document.querySelector('.user-info__photo');
  const imageIsOpened = document.querySelector(".image_isOpened");
  const errors = document.querySelectorAll(".error");
  const cardValidator = new FormValidator(document.forms.new, addPlaceButton, errors);
  const editValidator = new FormValidator(document.forms.edit, saveButton, errors);
  const avatarValidator = new FormValidator(document.forms.avatar, saveAvatarButton, errors);
  const cardList = new CardList(document.querySelector(".places-list"), createCard);
  const userInfo = new UserInfo(userName, userJob);
  const popupCard = new PopupCard(document.querySelector(".popup-card"), addPlaceButton, title, link, cardValidator);
  const popupEdit = new PopupEdit(document.querySelector(".popup-edit"), saveButton, name, job, userName, userJob, userInfo);
  const popupImage = new PopupImage(document.querySelector(".popup-image"), imageIsOpened);
  const popupAvatar = new PopupAvatar(document.querySelector(".popup-avatar"), saveAvatarButton, avatar, avatarValidator, userAvatar)


  cardValidator.setEventListeners();
  editValidator.setEventListeners();
  avatarValidator.setEventListeners();

  api.renderInitialCards()
    .then(cards => {
      api.getUserInfo()
        .then(id => cardList.render(cards, id._id))
        .catch(err => alert(err))
    })
    .catch(err => alert(err))

  api.getUserInfo()
    .then(info => {
      userName.textContent = info.name;
      userJob.textContent = info.about;
      userAvatar.style.backgroundImage = `url(${info.avatar})`;
    })
    .catch(err => alert(err))


  function sendNewCard(event) {
    event.preventDefault();
    cardValidator.renderLoading(true);
    api.addNewCard(title.value, link.value)
      .then(res => {
        const card = createCard(res.name, res.link, res.likes.length);
        cardList.addCard(card.create(res.owner._id, res.owner._id, res._id, res.likes))
        card.setEventListeners();
        title.value = "";
        link.value = "";
        addPlaceButton.setAttribute("disabled", true);
        addPlaceButton.classList.remove("popup__button_active");
      })
      .catch(err => alert(err))
      .finally(() => {
        popupCard.close();
        cardValidator.renderLoading(false, "+");
      })
  }

  function saveNewInformation(event) {
    event.preventDefault();
    editValidator.renderLoading(true);
    api.updateUserInfo(name.value, job.value)
      .then(info => {
        userInfo.setUserInfo(info.name, info.about);
        userInfo.updateUserInfo(info.name, info.about);
      })
      .catch(err => alert(err))
      .finally(() => {
        editValidator.renderLoading(false, "Сохранить");
        popupEdit.close();
      })
  }

  function saveNewAvatar(event) {
    event.preventDefault();
    avatarValidator.renderLoading(true);
    api.sendNewAvatar(avatar.value)
      .then(info => {
        userAvatar.style.backgroundImage = `url("${info.avatar}")`
      })
      .catch(err => alert(err))
      .finally(() => {
        avatarValidator.renderLoading(false, "Сохранить")
        popupAvatar.close();
        saveAvatarButton.setAttribute("disabled", true);
        saveAvatarButton.classList.remove("popup__button_active");
      })
  }

  function createCard(title, link, likes) {
    const placeCard = new Card(title, link, popupImage, likes, api);
    return placeCard
  }

  closeImageButton.addEventListener("click", popupImage.close);
  closeEditButton.addEventListener("click", popupEdit.close);
  closeAvatarButton.addEventListener("click", popupAvatar.close);
  closeButton.addEventListener("click", popupCard.close);
  editButton.addEventListener("click", popupEdit.open);
  userAvatar.addEventListener("click", popupAvatar.open);
  addButton.addEventListener("click", popupCard.open);
  formAvatar.addEventListener("submit", saveNewAvatar);
  formNew.addEventListener("submit", sendNewCard);
  formEdit.addEventListener("submit", saveNewInformation);

  document.addEventListener("keydown", function (event) {
    popupCard.closeEsc(event); 
    popupEdit.closeEsc(event);
    popupImage.closeEsc(event);
    popupAvatar.closeEsc(event);
  });
})();
