class CardList {

  constructor(container, createCard) {
    this.createCard = createCard;
    this.container = container;
  }

  addCard(cardElement) {
    this.container.appendChild(cardElement);
  }

  render(initialCards, id) {
    this.initialCards = initialCards;
    this.initialCards.forEach(card => {
      const cardElement = this.createCard(card.name, card.link, card.likes.length);
      this.container.appendChild(cardElement.create(card.owner._id, id, card._id, card.likes));
      cardElement.setEventListeners();
    })
  }


}