const signinBtn = document.getElementById("login-btn");

signinBtn.addEventListener("click", () => {
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("userPassword").value;

  if (username === "admin" && password === "admin123") {
    alert("Login successful!");
    window.location.assign("home.html");
  } else {
    alert("Invalid username or password. use admin and admin123.");
    return;
  }
});
