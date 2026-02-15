const ADMIN_PASSWORD = "admin@123";

const products = [
  { name: "Organic Turmeric", price: 150 },
  { name: "Cold Pressed Mustard Oil", price: 320 },
  { name: "Desi Ghee", price: 590 },
  { name: "Millet Flour", price: 120 },
];

const productGrid = document.getElementById("product-grid");
const adminPanel = document.getElementById("admin-panel");
const closeAdminButton = document.getElementById("close-admin");
const productForm = document.getElementById("product-form");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");

let adminUnlocked = false;

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function renderProducts() {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product";
    card.innerHTML = `<strong>${product.name}</strong><span>${formatPrice(product.price)}</span>`;
    productGrid.appendChild(card);
  });
}

function showAdminPanel() {
  adminPanel.classList.remove("hidden");
  adminPanel.setAttribute("aria-hidden", "false");
  productNameInput.focus();
}

function hideAdminPanel() {
  adminPanel.classList.add("hidden");
  adminPanel.setAttribute("aria-hidden", "true");
}

function requestAdminAccess() {
  const entered = window.prompt("Enter admin password to open panel:");

  if (entered === ADMIN_PASSWORD) {
    adminUnlocked = true;
    showAdminPanel();
    return;
  }

  if (entered !== null) {
    window.alert("Wrong password. Admin panel access denied.");
  }
}

window.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "1") {
    event.preventDefault();

    if (adminUnlocked) {
      showAdminPanel();
      return;
    }

    requestAdminAccess();
  }
});

closeAdminButton.addEventListener("click", hideAdminPanel);

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = productNameInput.value.trim();
  const price = Number(productPriceInput.value);

  if (!name || !price || price < 1) {
    window.alert("Please add a valid product name and price.");
    return;
  }

  products.unshift({ name, price });
  renderProducts();

  productForm.reset();
  productNameInput.focus();
});

renderProducts();
