// script to open / close the signup and login form

const modal1 = document.querySelector("#modal-1");
const modal2 = document.querySelector("#modal-2");
const openModal1 = document.querySelector("#signup");
const openModal2 = document.querySelector("#login");
const closeModal = document.querySelector(".close-button");

openModal1.addEventListener("click", () => {
    modal1.showModal();
});

openModal2.addEventListener("click", () => {
    modal2.showModal();
});

closeModal.addEventListener("click", () => {
    modal1.close();
    modal2.close();
});