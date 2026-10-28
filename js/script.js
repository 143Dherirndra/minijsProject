
"use strict";


// 1. Product data

let products = [
  {
    id: 1,
    title: "Tornado-52",
    price: 2499,
    category: "fan",
    image: "./image/Trending2.jpg"
  },
  {
    id: 2,
    title: "Decorative Fan",
    price: 1000,
    category: "fan",
    image: "./image/Trending3.jpg"
  },
  {
    id: 3,
    title: "Hand-made Fan",
    price: 1000,
    category: "fan",
    image: "./image/Trending-Fan.webp"
  },
  {
    id: 4,
    title: "Professional Air Cooler",
    price: 1000,
    category: "cooler",
    image: "./image/Trending4.jpeg"
  },
  {
    id: 5,
    title: "Havai Thunder",
    price: 1000,
    category: "cooler",
    image: "./image/Trending5.jpeg"
  },
  {
    id: 6,
    title: "Natural Air Cooler",
    price: 1000,
    category: "cooler",
    image: "./image/Trending6.jpeg"
  },
  {
    id: 7,
    title: "Fresh Mixer",
    price: 1000,
    category: "mixer",
    image: "./image/Trending7.jpeg"
  },
  {
    id: 8,
    title: "New Mixture",
    price: 1000,
    category: "mixer",
    image: "./image/Trending8.jpeg"
  },
  {
    id: 9,
    title: "Mixer Grinder",
    price: 1000,
    category: "mixer",
    image: "./image/Trending9.jpeg"
  },
  {
    id: 10,
    title: "Natural Mixer",
    price: 1000,
    category: "mixer",
    image: "./image/Trending10.jpeg"
  },
  {
    id: 11,
    title: "Sleek Design",
    price: 1000,
    category: "LED",
    image: "./image/Trending11.webp"
  },
  {
    id: 12,
    title: "Junction Light",
    price: 1000,
    category: "LED",
    image: "./image/Trending12.jpeg"
  },
  {
    id: 13,
    title: "New Light",
    price: 1000,
    category: "LED",
    image: "./image/Trending13.jpeg"
  }
];


// 2. CART  HTML element
let cart = [];

const ooo = document.querySelector(".ooo");
const cartSection = document.querySelector("#cartSection");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const allBtn = document.querySelector(".AllBtn");
const productSearch = document.querySelector("#productSearch");



// 3. Dispalay product;


function showProducts(items) {
  if (items.length === 0) {
    ooo.innerHTML = "<p>No products found!</p>";
    return;
  }

  const html = items.map((product) => {
    return `
      <div class="col-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100">

          <img
            src="${product.image}"
            class="card-img-top product-img"
            alt="${product.title}"
          >

          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>

            <p class="card-text">
              Category: ${product.category}
            </p>

            <h6 class="price-product">
              ₹${product.price}
            </h6>

            <button
              class="btn btn-primary"
              onclick="addToCart(${product.id})">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    `;
  });

  ooo.innerHTML = html.join("");
}


// 4. SHOW all product

function mydat() {
  showProducts(products);
}


// category filter

function CeilingFan() {
  const filtered = products.filter(
    (product) => product.category === "fan"
  );

  showProducts(filtered);
}

function AirCooler() {
  const filtered = products.filter(
    (product) => product.category === "cooler"
  );

  showProducts(filtered);
}

function mixer() {
  const filtered = products.filter(
    (product) => product.category === "mixer"
  );

  showProducts(filtered);
}

function Light() {
  const filtered = products.filter(
    (product) => product.category === "LED"
  );

  showProducts(filtered);
}


// 6. Add to cart


function addToCart(id) {
  const product = products.find(
    (f) => f.id === id
  );

  if (!product) return;

  const existingProduct = cart.find(
    (item) => item.id === id
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCartCount();

  alert(product.title + " added to cart!");
}



// 7. Update count


function updateCartCount() {
  const count = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartCount.textContent = count;
}


// display cart

function showCart() {
  cartSection.style.display = "block";
  ooo.style.display = "none";
  allBtn.style.display = "none";

  // Scroll to cart
  cartSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty!</p>";
    cartTotal.textContent = 0;
    return;
  }

  let total = 0;

  const html = cart.map((product) => {
    const subtotal = product.price * product.quantity;
    total += subtotal;

    return `
      <div class="card mb-3 p-3">

        <h5>${product.title}</h5>

        <p>Price: ₹${product.price}</p>

        <div class="d-flex align-items-center gap-3 mb-3">

          <button
            class="btn btn-secondary"
            onclick="changeQuantity(${product.id}, -1)">
            −
          </button>

          <span>${product.quantity}</span>

          <button
            class="btn btn-secondary"
            onclick="changeQuantity(${product.id}, 1)">
            +
          </button>

        </div>

        <p>Subtotal: ₹${subtotal}</p>

        <button
          class="btn btn-danger"
          onclick="removeFromCart(${product.id})">
          Remove
        </button>

      </div>
    `;
  });

  cartItems.innerHTML = html.join("");
  cartTotal.textContent = total;
}



// 9. Change product quality


function changeQuantity(id, change) {
  const product = cart.find(
    (item) => item.id === id
  );

  if (!product) return;

  product.quantity += change;

  if (product.quantity <= 0) {
    cart = cart.filter(
      (item) => item.id !== id
    );
  }

  updateCartCount();
  showCart();
}


// 10. Remove cart


function removeFromCart(id) {
  cart = cart.filter(
    (item) => item.id !== id
  );

  updateCartCount();
  showCart();
}


// continue shoping

function continueShopping() {
  cartSection.style.display = "none";
  ooo.style.display = "flex";
  allBtn.style.display = "block";

  mydat();

  document.querySelector("#products").scrollIntoView({
    behavior: "smooth"
  });
}


// navBarr link

function goHome() {
  cartSection.style.display = "none";
  ooo.style.display = "flex";
  allBtn.style.display = "block";

  document.querySelector("#home").scrollIntoView({
    behavior: "smooth"
  });
}

function goCategory() {
  cartSection.style.display = "none";
  ooo.style.display = "flex";
  allBtn.style.display = "block";

  document.querySelector("#categories").scrollIntoView({
    behavior: "smooth"
  });
}

function goProduct() {
  cartSection.style.display = "none";
  ooo.style.display = "flex";
  allBtn.style.display = "block";

  mydat();

  document.querySelector("#products").scrollIntoView({
    behavior: "smooth"
  });
}

function goAbout() {
  cartSection.style.display = "none";
  ooo.style.display = "flex";
  allBtn.style.display = "block";

  document.querySelector("#about").scrollIntoView({
    behavior: "smooth"
  });
}

function goContact() {
  cartSection.style.display = "none";
  ooo.style.display = "flex";
  allBtn.style.display = "block";

  document.querySelector("#contact").scrollIntoView({
    behavior: "smooth"
  });
}


// product search

productSearch.addEventListener("input", function () {
  const searchText = productSearch.value
    .toLowerCase()
    .trim();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText)
  );

  showProducts(filteredProducts);
});


// ininitiallize web


mydat();
updateCartCount();
