window.user_credentials = {
  username: "AdminSEF123",
  password: "SeF@ctORy$$456",
};

document.querySelector(".logout-link")?.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace('./login.html')
});
