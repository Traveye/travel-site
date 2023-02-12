//functions to open and close the modals

const modal1 = document.querySelector("#modal-1");
const modal2 = document.querySelector("#modal-2");
const openModal1 = document.querySelector("#signup");
const openModal2 = document.querySelector("#login");
const closeModal = document.querySelector(".close-button");
const signup = document.querySelector("#signup-call");
const login = document.querySelector("#login-call");

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

//makes the fetch call to create a new user
signup.addEventListener("click", async () => {
  const username = document.querySelector("#username").value.trim();
  const display_name = document.querySelector("#display_name").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && display_name && password) {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ username, display_name, password }),
        headers: { "Content-Type": "application/json" },

      });
      const data = await response.json();
      console.log("Success:", data);
      document.location.replace("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  }
});



//fucntion to make the fetch call to login
login.addEventListener("click", async () => {
    const username = document.querySelector("#login-username").value.trim();
    const password = document.querySelector("#login-password").value.trim();
    
    if (username && password) {
        try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("Success:", data);
        window.location.assign("/dashboard");
        } catch (error) {
        console.error("Error:", error);
        }
    }
});