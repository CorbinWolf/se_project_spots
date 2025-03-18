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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileSubmitButton = editProfileModal.querySelector(
  ".modal__submit-button"
);

function openModal() {
  editProfileCloseButton.classList.remove("modal__transition_off");
  editProfileNameInput.classList.remove("modal__transition_off");
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.classList.remove("modal__transition_off");
  editProfileDescriptionInput.value = profileDescription.textContent;
  editProfileSubmitButton.classList.remove("modal__transition_off");
  editProfileModal.classList.add("modal_opened");
}

function closeModal() {
  editProfileCloseButton.classList.add("modal__transition_off");
  editProfileNameInput.classList.add("modal__transition_off");
  editProfileDescriptionInput.classList.add("modal__transition_off");
  editProfileSubmitButton.classList.add("modal__transition_off");
  editProfileModal.classList.remove("modal_opened");
}

editProfileOpenButton.addEventListener("click", openModal);

editProfileCloseButton.addEventListener("click", closeModal);
