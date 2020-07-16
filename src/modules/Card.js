export class Card {

  constructor(title, link, popupImage, likes, api) {
    this.title = title;
    this.link = link;
    this.popupImage = popupImage;
    this.likes = likes;
    this.api = api;
  }

  like() {
    this.api.putLike(this.cardElement.id)
      .then(card => {
        if (!this.likeButton.classList.contains("place-card__like-icon_liked")) {
          this.likeButton.classList.toggle("place-card__like-icon_liked");
          this.likeQuantity.textContent = card.likes.length;
        }
        else {
          this.api.deleteLike(this.cardElement.id)
            .then(card => {
              this.likeButton.classList.toggle("place-card__like-icon_liked");
              this.likeQuantity.textContent = card.likes.length;
            })
            .catch(err => alert(err))
        }
      })
      .catch(err => alert(err))
  }

  remove() {
    this.api.deleteCard(this.cardElement.id)
      .then(res => {
        if (res.message === "Пост удалён") {
          this.removeEventListeners();
          this.cardElement.remove();
        }
      })
      .catch(err => alert(err))
  }

  create(cardOwnerId, myId, cardId, likes) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.id = `${cardId}`

    const image = document.createElement("div");
    image.classList.add("place-card__image");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("place-card__delete-icon");

    const cardDescription = document.createElement("div");
    cardDescription.classList.add("place-card__description");

    const cardName = document.createElement("h3");
    cardName.classList.add("place-card__name");

    const likeArea = document.createElement("div")
    likeArea.classList.add("place-card__like-area")

    const likeButton = document.createElement("button");
    likeButton.classList.add("place-card__like-icon");

    likes.forEach(liker => {
      if (liker._id === myId) {
        likeButton.classList.add("place-card__like-icon_liked");
      }
    })

    const likeQuantity = document.createElement("p");
    likeQuantity.classList.add("place-card__likes-quantity");
    likeQuantity.textContent = `${this.likes}`

    this.image = image;
    this.likeQuantity = likeQuantity;
    this.likeButton = likeButton;
    this.deleteButton = deleteButton;

    if (cardOwnerId === myId) {
      deleteButton.style.display = "block";
    }

    image.appendChild(deleteButton);
    cardDescription.appendChild(cardName);
    likeArea.appendChild(likeButton);
    likeArea.appendChild(likeQuantity);
    placeCard.appendChild(image);
    placeCard.appendChild(cardDescription);
    cardDescription.appendChild(likeArea);

    image.style.backgroundImage = `url(${this.link})`;
    cardName.textContent = this.title;

    this.cardElement = placeCard;

    return placeCard;
  }

  setEventListeners() {
    this.likeButton.addEventListener("click", () => this.like());
    this.deleteButton.addEventListener("click", () => {
      if (confirm("Вы действительно хотите удалить эту карточку?")) {
        this.remove();
      }
    });
    this.image.addEventListener("click", (event) => this.popupImage.open(event));
  }

  removeEventListeners() {
    this.likeButton.removeEventListener("click", () => this.like());
    this.deleteButton.removeEventListener("click", () => this.remove());
    this.image.removeEventListener("click", () => this.popupImage.open());
  }
}