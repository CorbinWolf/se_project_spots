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
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const addCardOpenButton = document.querySelector(".profile__add-button");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");

const editProfileForm = document.forms["edit-profile-form"];
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector(
  "#edit-profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#edit-profile-description-input"
);

const addCardForm = document.forms["add-card-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardNameInput = addCardModal.querySelector("#add-card-name-input");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardElementTitle = cardElement.querySelector(".card__title");
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardElementLikeButton = cardElement.querySelector(".card__like-button");
  const cardElementDeleteButton = cardElement.querySelector(
    ".card__delete-button"
  );

  cardElementTitle.textContent = data.name;
  cardElementImage.alt = data.name;
  cardElementImage.src = data.link;

  cardElementLikeButton.addEventListener("click", () => {
    cardElementLikeButton.classList.toggle("card__like-button_liked");
  });

  cardElementDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardElementImage.addEventListener("click", () => {
    openModal(previewModal);
    previewImage.alt = data.name;
    previewImage.src = data.link;
    previewCaption.textContent = data.name;
  });

  return cardElement;
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsList[method](cardElement);
}

function fillProfileForm() {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
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
  renderCard(inputValues);
  evt.target.reset();
  closeModal(addCardModal);
}

initialCards.forEach((card) => {
  renderCard(card);
});

modalCloseButtons.forEach((button) => {
  const currentModal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(currentModal);
  });
});

editProfileOpenButton.addEventListener("click", () => {
  openModal(editProfileModal);
  fillProfileForm();
});
editProfileForm.addEventListener("submit", submitProfileModal);

addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", submitCardModal);
