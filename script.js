// North Star Bakery - Touchstone 4 JavaScript

// Product data stored in an array of objects
const bakeryProducts = [
  { id: 1, name: "Fresh Bread", category: "Bread" },
  { id: 2, name: "Cupcakes", category: "Dessert" },
  { id: 3, name: "Cookies", category: "Dessert" },
  { id: 4, name: "Custom Cakes", category: "Cake" }
];

// Store customer information in an object
const customerData = {
  name: "",
  email: ""
};

// Load favorites from localStorage
function getFavorites() {
  const savedFavorites = localStorage.getItem("northStarFavorites");

  if (savedFavorites) {
    return JSON.parse(savedFavorites);
  }

  return [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
  localStorage.setItem(
    "northStarFavorites",
    JSON.stringify(favorites)
  );
}

// Add or remove a favorite product
function toggleFavorite(productName) {
  let favorites = getFavorites();

  if (favorites.includes(productName)) {
    favorites = favorites.filter(
      product => product !== productName
    );
  } else {
    favorites.push(productName);
  }

  saveFavorites(favorites);
  displayFavorites();
}

// Display saved favorites on the page
function displayFavorites() {
  const favoritesList = document.getElementById("favorites-list");

  if (!favoritesList) {
    return;
  }

  const favorites = getFavorites();
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.textContent =
      "You have not selected any favorites yet.";
    return;
  }

  favorites.forEach(product => {
    const item = document.createElement("li");
    item.textContent = product;
    favoritesList.appendChild(item);
  });
}

// Validate the contact form
function validateContactForm(event) {
  event.preventDefault();
  const form = event.target;

  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");

  const nameError = form.querySelector("#name-error");
  const emailError = form.querySelector("#email-error");
  const messageError = form.querySelector("#message-error");

  let isValid = true;

  // Clear old messages
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  // Required name validation
  if (nameField.value.trim().length < 2) {
    nameError.textContent =
      "Please enter at least 2 characters for your name.";
    isValid = false;
  }

  // Email format validation
  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailField.value.trim())) {
    emailError.textContent =
      "Please enter a valid email address.";
    isValid = false;
  }

  // Minimum message length validation
  if (messageField.value.trim().length < 10) {
    messageError.textContent =
      "Please enter a message of at least 10 characters.";
    isValid = false;
  }

  if (!isValid) {
   
    return;
  }

  // Save customer information
  customerData.name = nameField.value.trim();
  customerData.email = emailField.value.trim();

  localStorage.setItem(
    "northStarCustomer",
    JSON.stringify(customerData)
  );
}

// Restore saved customer information
function loadCustomerData() {
  const savedCustomer =
    localStorage.getItem("northStarCustomer");

  if (!savedCustomer) {
    return;
  }

  const customer = JSON.parse(savedCustomer);

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");

  if (nameField) {
    nameField.value = customer.name || "";
  }

  if (emailField) {
    emailField.value = customer.email || "";
  }
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", function () {
  displayFavorites();
  loadCustomerData();

  const contactForm =
    document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener(
      "submit",
      validateContactForm
    );
  }
});
