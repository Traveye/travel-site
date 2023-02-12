const logoutButton = document.querySelector("#logout");

const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
    alert("You have been logged out.");
  } else {
    alert("Failed to log out.");
  }
};

logoutButton.addEventListener("click", logout);