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
signup.addEventListener("click", () => {
  Swal.fire({
    title: 'Sign Up',
    html:
      '<input type="text" id="username" placeholder="Username" class="input-field grid-col-span-2">' +
      '<div id="nameCheck" class="hidden"></div>' +
      '<input type="text" id="display_name" placeholder="Display Name" class="input-field grid-col-span-2">' +
      '<input type="password" id="password" placeholder="Password" class="input-field grid-col-span-2">',
    showCancelButton: true,
    confirmButtonText: 'Sign Up',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: async () => {
      const username = document.querySelector("#username").value.trim();
      const display_name = document.querySelector("#display_name").value.trim();
      const password = document.querySelector("#password").value.trim();

      if (!username || !display_name || !password) {
        Swal.showValidationMessage("Please fill out all fields.");
        return false;
      }

      try {
        const response = await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({ username, display_name, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.errors) {
          Swal.showValidationMessage("Failed to sign up.");
          return false;
        }
      } catch (error) {
        console.log("Error:", error);
        Swal.showValidationMessage("Failed to sign up.");
        return false;
      }

      return true;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      document.location.replace("/dashboard");
    }
  });

  const nameInput = Swal.getContent().querySelector("#username");
  const nameCheck = Swal.getContent().querySelector("#nameCheck");
  nameInput.addEventListener("blur", async () => {
    nameCheck.classList.add("hidden");
    nameCheck.innerHTML = "";
  
    const nameTyped = nameInput.value.trim();
    if (nameTyped) {
      try {
        const response = await fetch("/api/user/username", {
          method: "POST",
          body: JSON.stringify({ nameTyped }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
      
        if (data.message === "Username is taken!❌") {
          nameCheck.classList.remove("hidden");
          nameCheck.innerHTML = "Username already taken.";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
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

