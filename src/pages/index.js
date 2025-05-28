import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2b803712-2776-4a6d-aa20-915c5035123d",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      renderCard(card, "append");
    });
    avatarImage.src = userInfo.avatar;
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
  })
  .catch(console.error);

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

const avatarImage = document.querySelector(".profile__avatar-image");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editAvatarOpenButton = document.querySelector(".profile__avatar-button");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const addCardOpenButton = document.querySelector(".profile__add-button");

const modalCloseButtons = document.querySelectorAll(".modal__close-button");
const modals = document.querySelectorAll(".modal");

const editAvatarForm = document.forms["edit-avatar-form"];
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarImageInput = editAvatarModal.querySelector(
  "#edit-avatar-image-input"
);
const editAvatarSubmitButton = editAvatarModal.querySelector(
  "#edit-avatar-submit-button"
);

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

const deleteCardForm = document.forms["delete-card-form"];
const deleteCardModal = document.querySelector("#delete-card-modal");

const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

let selectedCard, selectedCardId;

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
    openDeleteCardModal(cardElement, data._id);
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

function openDeleteCardModal(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteCardModal);
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

function submitAvatarModal(evt) {
  evt.preventDefault();
  api
    .editAvatarImage({ avatar: editAvatarImageInput.value })
    .then((data) => {
      avatarImage.src = data.avatar;
      evt.target.reset();
      disableButton(editAvatarSubmitButton, settings);
      closeModal(editAvatarModal);
    })
    .catch(console.error);
}

function submitProfileModal(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      evt.target.reset();
      disableButton(editProfileSubmitButton, settings);
      closeModal(editProfileModal);
    })
    .catch(console.error);
}

function submitAddCardModal(evt) {
  evt.preventDefault();
  api
    .addCard({
      link: addCardLinkInput.value,
      name: addCardNameInput.value,
    })
    .then((data) => {
      renderCard(data);
      evt.target.reset();
      disableButton(addCardSubmitButton, settings);
      closeModal(addCardModal);
    })
    .catch(console.error);
}

function submitDeleteCardModal(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error);
}

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

editAvatarOpenButton.addEventListener("click", () => {
  openModal(editAvatarModal);
});
editAvatarForm.addEventListener("submit", submitAvatarModal);

editProfileOpenButton.addEventListener("click", () => {
  openModal(editProfileModal);
  setProfileForm();
});
editProfileForm.addEventListener("submit", submitProfileModal);

addCardOpenButton.addEventListener("click", () => {
  openModal(addCardModal);
});
addCardForm.addEventListener("submit", submitAddCardModal);

deleteCardForm.addEventListener("submit", submitDeleteCardModal);

enableValidation(settings);
