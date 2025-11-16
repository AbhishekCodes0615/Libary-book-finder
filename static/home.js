// Function to toggle sidebar visibility on small screens
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hide");
}

// Highlight the active menu item in sidebar
const menuItems = document.querySelectorAll(".sidebar ul li");
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Search box functionality
const searchBox = document.querySelector(".search-box input");

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let query = searchBox.value.trim();
    if (query) {
      alert(`Searching for: "${query}"`);
      // Later, you can connect this to a real search function or Flask route
      searchBox.value = "";
    }
  }
});

// Hover effect for user profile
const userBox = document.querySelector(".user");
userBox.addEventListener("mouseenter", () => {
  userBox.style.backgroundColor = "#c9eac7";
});
userBox.addEventListener("mouseleave", () => {
  userBox.style.backgroundColor = "#e1f2e0";
});

// "Find out more" button action
const bannerButton = document.querySelector(".banner-text button");
bannerBut
