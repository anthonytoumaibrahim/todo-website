// Check if user is logged in
if (
  localStorage.username !== window.user_credentials.username &&
  localStorage.password !== window.user_credentials.password
) {
  // Redirect to login page
  window.location.replace('./login.html')
}
