const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const addCardOpenButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile-form"];
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameInput = editProfileModal.querySelector(
  "#edit-profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#edit-profile-description-input"
);

const addCardForm = document.forms["add-card-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardNameInput = addCardModal.querySelector("#add-card-name-input");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardElementName = cardElement.querySelector(".card__title");
  const cardElementLink = cardElement.querySelector(".card__image");
  const cardElementLikeButton = cardElement.querySelector(".card__like-button");
  const cardElementDeleteButton = cardElement.querySelector(
    ".card__delete-button"
  );

  cardElementName.textContent = data.name;
  cardElementLink.alt = data.name;
  cardElementLink.src = data.link;

  cardElementLikeButton.addEventListener("click", () => {
    cardElementLikeButton.classList.toggle("card__like-button_liked");
  });

  cardElementDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function fillProfileForm() {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

function unfillCardForm() {
  addCardLinkInput.value = "";
  addCardNameInput.value = "";
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function submitProfileModal(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

function submitCardModal(evt) {
  evt.preventDefault();
  const inputValues = {
    link: addCardLinkInput.value,
    name: addCardNameInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  closeModal(addCardModal);
}

initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

editProfileOpenButton.addEventListener("click", () => {
  openModal(editProfileModal);
  fillProfileForm();
});
editProfileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});
editProfileForm.addEventListener("submit", submitProfileModal);

addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
  unfillCardForm();
});
addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});
addCardForm.addEventListener("submit", submitCardModal);
