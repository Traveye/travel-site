//functions to open and close the modals
const newUser = document.querySelector("#signup");
const user = document.querySelector("#login");
const closeModal = document.querySelector(".close-button");
const signup = document.querySelector("#signup-call");
const login = document.querySelector("#login-call");
const username = document.querySelector("#username");
const backgroundEl = document.getElementById("login-main");


//makes the fetch call to create a new user
newUser.addEventListener("click", () => {
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
        } else {
          document.location.replace("/dashboard");
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

  const nameInput = Swal.getHtmlContainer().querySelector("#username");
  const nameCheck = Swal.getHtmlContainer().querySelector("#nameCheck");
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
          nameCheck.innerHTML = "Username is taken!❌";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
});


//fucntion to make the fetch call to login
user.addEventListener("click", () => {
  Swal.fire({
    title: 'Login',
    html:
    '<input type="text" id="login-username" placeholder="Username" class="input-field">' +
    '<input type="password" id="login-password" placeholder="Password" class="input-field">',
    showCancelButton: true,
    confirmButtonText: 'Login',
    cancelButtonText: 'Cancel',
    focusConfirm: false,
    preConfirm: async () => {
      const username = document.querySelector("#login-username").value.trim();
      const password = document.querySelector("#login-password").value.trim();

      if (!username || !password) {
        Swal.showValidationMessage("Please fill out all fields.");
        return false;
      }

      try {
        const response = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.errors) {
          Swal.showValidationMessage("Failed to login.");
          return false;
        } else {
          document.location.replace("/dashboard");
        }
      } catch (error) {
        console.log("Error:", error);
        Swal.showValidationMessage("Failed to login.");
        return false;
      }
    }

  })
});

console.log(window.innerWidth);

addEventListener("resize", () => {
  console.log(window.innerWidth);
  if(window.innerWidth <= 768) {
    backgroundEl.replaceWith(... backgroundEl.childNodes);
  } else {
    backgroundEl.classList.add("background-image");
    // "url("/images/loginbg-2.png")"
}
});
