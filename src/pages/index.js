import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";

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
const modals = document.querySelectorAll(".modal");

const editProfileForm = document.forms["edit-profile-form"];
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector(
  "#edit-profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#edit-profile-description-input"
);
const editProfileSubmitButton = editProfileModal.querySelector(
  "#edit-profile-submit-button"
);

const addCardForm = document.forms["add-card-form"];
const addCardModal = document.querySelector("#add-card-modal");
const addCardLinkInput = addCardModal.querySelector("#add-card-link-input");
const addCardNameInput = addCardModal.querySelector("#add-card-name-input");
const addCardSubmitButton = addCardModal.querySelector(
  "#add-card-submit-button"
);

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

function setProfileForm() {
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  document.removeEventListener("keydown", handleEscape);
  modal.classList.remove("modal_opened");
}

function submitProfileModal(evt) {
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  evt.target.reset();
  disableButton(editProfileSubmitButton, settings);
  closeModal(editProfileModal);
}

function submitCardModal(evt) {
  const inputValues = {
    link: addCardLinkInput.value,
    name: addCardNameInput.value,
  };
  renderCard(inputValues);
  evt.target.reset();
  disableButton(addCardSubmitButton, settings);
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

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
});

function handleEscape(evt) {
  modals.forEach((modal) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
}

editProfileOpenButton.addEventListener("click", () => {
  openModal(editProfileModal);
  setProfileForm();
});
editProfileForm.addEventListener("submit", submitProfileModal);

addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", submitCardModal);

enableValidation(settings);
