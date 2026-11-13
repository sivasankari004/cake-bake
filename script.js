
// ==============================
// MOBILE NAVIGATION
// ==============================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuButton.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.textContent = "☰";
    });
});


// ==============================
// SHOPPING CART
// ==============================

let cart = [];

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// OPEN CART

cartButton.addEventListener("click", () => {
    cartOverlay.classList.add("active");
});


// CLOSE CART

closeCart.addEventListener("click", () => {
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("active");
    }
});


// ADD PRODUCTS TO CART

document.querySelectorAll(".add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = "+ Add";
        }, 1000);

    });

});


// UPDATE CART

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty!</h3>
                <p>Add your favourite cakes to get started.</p>
            </div>
        `;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        const itemDetails = document.createElement("div");

        const itemName = document.createElement("h4");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("p");
        itemPrice.textContent =
            "₹" + item.price * item.quantity;

        itemDetails.append(itemName, itemPrice);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Decrease quantity");

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Increase quantity");

        minus.addEventListener("click", () => {
            changeQuantity(index, -1);
        });

        plus.addEventListener("click", () => {
            changeQuantity(index, 1);
        });

        controls.append(minus, quantity, plus);

        itemElement.append(itemDetails, controls);

        cartItems.appendChild(itemElement);

    });

    cartCount.textContent = count;

    cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");

}


// CHANGE PRODUCT QUANTITY

function changeQuantity(index, change) {

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();

}


// ==============================
// PRODUCT SEARCH & FILTER
// ==============================

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

const products = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");


function filterProducts() {

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedCategory = categoryFilter.value;

    let visibleProducts = 0;

    products.forEach(product => {

        const name = product.dataset.name.toLowerCase();

        const category = product.dataset.category;

        const matchesSearch = name.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "block";
            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });

    noResults.style.display =
        visibleProducts === 0 ? "block" : "none";

}


// SEARCH EVENT

searchInput.addEventListener("input", filterProducts);


// CATEGORY FILTER EVENT

categoryFilter.addEventListener("change", filterProducts);


// CATEGORY CARD CLICK

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", () => {

        categoryFilter.value = card.dataset.category;

        filterProducts();

    });

});


// ==============================
// CHECKOUT DEMO
// ==============================

document.getElementById("checkoutBtn").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    alert(
        "Thank you for choosing Sweet Crumbs!\n\n" +
        "Your cart total is " + cartTotal.textContent +
        ".\n\nThis is a demo checkout. Connect a backend to place real orders."
    );

});


// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document
        .getElementById("customerName")
        .value.trim();

    const email = document
        .getElementById("customerEmail")
        .value.trim();

    const phone = document
        .getElementById("customerPhone")
        .value.trim();

    const message = document
        .getElementById("customerMessage")
        .value.trim();

    const output = document.getElementById("formMessage");

    if (!name || !email || !phone || !message) {

        output.textContent = "Please fill in all the fields.";

        return;

    }

    output.textContent =
        "Thank you, " + name +
        "! Your message has been validated successfully.";

    contactForm.reset();

});


// ==============================
// FOOTER YEAR
// ==============================

document.getElementById("year").textContent =
    new Date().getFullYear();


// INITIAL CART

updateCart();
