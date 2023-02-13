//functions to open and close the modals
const modal1 = document.querySelector("#modal-1");
const modal2 = document.querySelector("#modal-2");
const openModal1 = document.querySelector("#signup");
const openModal2 = document.querySelector("#login");
const closeModal = document.querySelector(".close-button");
const signup = document.querySelector("#signup-call");
const login = document.querySelector("#login-call");
const username = document.querySelector("#username");

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
      if (!data.errors) {
        document.location.replace("/dashboard");
        alert("You have been signed up!");
      } else {
        alert("Not signed up.");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to sign up.");
    }
  } else {
    alert("Please fill out all fields.");
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
      if(!data.errors) {
      window.location.assign("/dashboard");
      } else {
        alert("Failed to log in.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log in.");
    }
  }
});

// this function is to check if the username typed in is already in the database
username.addEventListener("blur", async (e) => {
  e.preventDefault();
  const nameTyped = document.querySelector("#username").value.trim();
  if (nameTyped) {
    try {
      const response = await fetch("/api/user/username", {
        method: "POST",
        body: JSON.stringify({ nameTyped }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data) {
        //this will render the message in our hidden div
        hiddenDiv = document.querySelector("#nameCheck");
        hiddenDiv.classList.remove("hidden");
        hiddenDiv.innerHTML = "Username already taken.";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});