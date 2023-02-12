// script to open / close the signup and login form

const modal = document.querySelector("#modal-1");
const modal2 = document.querySelector("#modal-2");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
    modal.showModal();
});