// Select the form
const form = document.querySelector("form");
const loginIdInput = document.querySelector('input[name="login_id"]');
const passwordInput = document.querySelector('input[name="password"]');

// Add form submit listener
form.addEventListener("submit", (event) => {
  const loginId = loginIdInput.value.trim();
  const password = passwordInput.value.trim();

  // Simple validation
  if (loginId === "" || password === "") {
    event.preventDefault(); // Stop form from submitting
    alert("Please fill in both Login ID and Password!");
    return;
  }

  // Optional: validate password length
  if (password.length < 4) {
    event.preventDefault();
    alert("Password must be at least 4 characters long.");
    return;
  }

  // Optional: success feedback
  console.log("Form submitted successfully!");
});

// ✅ Optional: Add 'Enter' key support
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    form.requestSubmit();
  }
});