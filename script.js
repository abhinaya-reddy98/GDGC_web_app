/**
 * EliteCart — Shopping Cart JavaScript
 * Handles: Products, Cart, LocalStorage, UI interactions
 */

/* =====================================================
   PRODUCT DATA
   ===================================================== */
const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    category: "mobile",
    price: 1199,
    oldPrice: 1399,
    rating: 4.9,
    reviews: 2847,
    badge: "New",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "computing",
    price: 1999,
    oldPrice: 2299,
    rating: 4.8,
    reviews: 1523,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    category: "audio",
    price: 349,
    oldPrice: 399,
    rating: 4.9,
    reviews: 4210,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  },
  {
    id: 4,
    name: "Apple Watch Ultra 2",
    category: "accessories",
    price: 799,
    oldPrice: 899,
    rating: 4.7,
    reviews: 983,
    badge: "New",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  },
  {
    id: 5,
    name: "Canon EOS R6 Mark II",
    category: "accessories",
    price: 2499,
    oldPrice: null,
    rating: 4.8,
    reviews: 671,
    badge: null,
    image: "https://images.unsplash.com/photo-1519183071298-a2962be96f83?w=500&q=80",
  },
  {
    id: 6,
    name: "JBL Charge 5 Speaker",
    category: "audio",
    price: 179,
    oldPrice: 219,
    rating: 4.7,
    reviews: 3320,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80",
  },
  {
    id: 7,
    name: "Logitech G Pro X Mouse",
    category: "computing",
    price: 129,
    oldPrice: 149,
    rating: 4.8,
    reviews: 1876,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
  },
  {
    id: 8,
    name: "Samsung Galaxy Tab S9",
    category: "mobile",
    price: 699,
    oldPrice: 799,
    rating: 4.6,
    reviews: 1102,
    badge: null,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80",
  },
  {
    id: 9,
    name: "Meta Quest 3 VR Headset",
    category: "accessories",
    price: 499,
    oldPrice: 599,
    rating: 4.5,
    reviews: 788,
    badge: "New",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=500&q=80",
  },
  {
    id: 10,
    name: "Keychron Q1 Keyboard",
    category: "computing",
    price: 169,
    oldPrice: null,
    rating: 4.9,
    reviews: 2204,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
  },
  {
    id: 11,
    name: "AirPods Pro 2nd Gen",
    category: "audio",
    price: 249,
    oldPrice: 279,
    rating: 4.8,
    reviews: 5601,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1572631382901-cf1a0a9946ed?w=500&q=80",
  },
  {
    id: 12,
    name: "Dell UltraSharp 4K Monitor",
    category: "computing",
    price: 649,
    oldPrice: 749,
    rating: 4.7,
    reviews: 934,
    badge: null,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
  },
];

/* =====================================================
   CART STATE
   ===================================================== */
let cart = loadCartFromStorage();
let currentFilter = "all";

/* =====================================================
   LOCAL STORAGE HELPERS
   ===================================================== */

/** Load cart from localStorage, return empty array if none found */
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("elitecart_cart");
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("Could not load cart from localStorage:", e);
    return [];
  }
}

/** Save current cart array to localStorage */
function saveCartToStorage() {
  try {
    localStorage.setItem("elitecart_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Could not save cart to localStorage:", e);
  }
}

/* =====================================================
   RENDER PRODUCTS
   ===================================================== */

/** Generate star HTML string from a numeric rating */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = "★".repeat(full);
  if (half) stars += "½";
  stars += "☆".repeat(5 - full - (half ? 1 : 0));
  return stars;
}

/** Render product cards to the grid, optionally filtered by category */
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  const filtered = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = filtered.map((product, index) => {
    const badgeClass = product.badge === "Sale" ? "sale"
      : product.badge === "Popular" ? "popular" : "";

    return `
      <article class="product-card" style="animation-delay:${index * 0.06}s">
        ${product.badge ? `<div class="product-badge ${badgeClass}">${product.badge}</div>` : ""}
        <div class="product-img-wrap">
          <img
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80'"
          />
        </div>
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <span class="stars" aria-label="${product.rating} stars">${renderStars(product.rating)}</span>
            <span class="rating-count">(${product.reviews.toLocaleString()})</span>
          </div>
          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price">$${product.price.toLocaleString()}</span>
              ${product.oldPrice ? `<span class="product-price-old">$${product.oldPrice.toLocaleString()}</span>` : ""}
            </div>
            <button
              class="add-to-cart-btn"
              onclick="addToCart(${product.id})"
              id="addBtn-${product.id}"
              aria-label="Add ${product.name} to cart"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* =====================================================
   CART LOGIC
   ===================================================== */

/** Add a product to cart or increment its quantity */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    // Product already in cart — increment quantity
    existingItem.quantity += 1;
  } else {
    // New cart entry
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCartToStorage();
  updateCartUI();
  showAddedFeedback(productId);
  showToast(`"${product.name}" added to cart!`);
}

/** Increase quantity of a cart item */
function increaseQty(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += 1;
    saveCartToStorage();
    updateCartUI();
  }
}

/** Decrease quantity; removes item if quantity hits 0 */
function decreaseQty(productId) {
  const itemIndex = cart.findIndex(i => i.id === productId);
  if (itemIndex === -1) return;

  if (cart[itemIndex].quantity > 1) {
    cart[itemIndex].quantity -= 1;
  } else {
    // Remove item entirely
    cart.splice(itemIndex, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

/** Remove a specific item from cart */
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartUI();
  showToast("Item removed from cart.");
}

/** Clear all items from cart */
function clearCart() {
  cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast("Cart cleared.");
}

/** Calculate total number of items in cart */
function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/** Calculate total price of cart */
function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/* =====================================================
   UPDATE CART UI
   ===================================================== */

/** Full cart UI refresh: counter, sidebar items, totals */
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Update navbar badge
  const countEl = document.getElementById("cartCount");
  countEl.textContent = count;
  if (count > 0) {
    countEl.classList.add("visible");
  } else {
    countEl.classList.remove("visible");
  }

  // Update cart item count text in sidebar header
  const countText = document.getElementById("cartItemCountText");
  countText.textContent = count > 0 ? `(${count})` : "";

  // Show/hide empty state vs content
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartItems = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartEmpty.style.display = "flex";
    cartFooter.style.display = "none";
    cartItems.innerHTML = "";
  } else {
    cartEmpty.style.display = "none";
    cartFooter.style.display = "block";
    renderCartItems();
  }

  // Update totals
  document.getElementById("cartSubtotal").textContent = `$${total.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
}

/** Render all cart items into the sidebar */
function renderCartItems() {
  const cartItemsEl = document.getElementById("cartItems");
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" id="cartItem-${item.id}">
      <img
        class="cart-item-img"
        src="${item.image}"
        alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80'"
      />
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <div class="cart-qty-controls">
          <button class="qty-btn" onclick="decreaseQty(${item.id})" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQty(${item.id})" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button
        class="cart-item-remove"
        onclick="removeFromCart(${item.id})"
        aria-label="Remove ${item.name} from cart"
        title="Remove item"
      >✕</button>
    </div>
  `).join("");
}

/* =====================================================
   CART SIDEBAR OPEN / CLOSE
   ===================================================== */

/** Open the cart sidebar */
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("visible");
  document.body.style.overflow = "hidden";
}

/** Close the cart sidebar */
function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("visible");
  document.body.style.overflow = "";
}

/* =====================================================
   ADD BUTTON VISUAL FEEDBACK
   ===================================================== */

/** Briefly change the "Add" button to a green "Added!" state */
function showAddedFeedback(productId) {
  const btn = document.getElementById(`addBtn-${productId}`);
  if (!btn) return;

  btn.classList.add("added");
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    Added!
  `;

  setTimeout(() => {
    btn.classList.remove("added");
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add
    `;
  }, 1800);
}

/* =====================================================
   TOAST NOTIFICATION
   ===================================================== */

let toastTimer = null;

/** Show a toast notification with a custom message */
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMessage");

  toastMsg.textContent = message;
  toast.classList.add("show");

  // Clear any existing timer
  if (toastTimer) clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* =====================================================
   CHECKOUT MODAL
   ===================================================== */

/** Show the checkout success modal and clear cart */
function handleCheckout() {
  if (cart.length === 0) return;

  // Generate a random order ID
  const orderId = "ELT-" + Math.random().toString(36).toUpperCase().slice(2, 8);
  document.getElementById("orderId").textContent = orderId;

  // Show modal
  document.getElementById("modalOverlay").classList.add("visible");

  // Clear cart
  clearCart();
  closeCart();
}

/** Close the checkout modal */
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("visible");
}

/* =====================================================
   PRODUCT FILTER
   ===================================================== */

/** Handle filter button clicks */
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentFilter = btn.dataset.filter;
      renderProducts(currentFilter);
    });
  });
}

/* =====================================================
   NAVBAR SCROLL BEHAVIOR
   ===================================================== */

/** Add shadow to navbar on scroll, highlight active nav links */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    // Sticky shadow
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link tracking
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

/* =====================================================
   HAMBURGER MENU (Mobile)
   ===================================================== */

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close menu when a nav link is clicked
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    });
  });
}

/* =====================================================
   CONTACT FORM
   ===================================================== */

function initContactForm() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Message sent! We'll get back to you soon. 💌");
    form.reset();
  });
}

/* =====================================================
   INTERSECTION OBSERVER — Card Animations
   ===================================================== */

/** Stagger-fade in product cards as they enter viewport */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Re-observe after products re-render
  const observeCards = () => {
    document.querySelectorAll(".product-card").forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
      observer.observe(card);
    });
  };

  // Use MutationObserver to re-trigger when grid updates
  const grid = document.getElementById("productsGrid");
  const mutationObserver = new MutationObserver(observeCards);
  mutationObserver.observe(grid, { childList: true });

  // Initial observation
  observeCards();
}

/* =====================================================
   EVENT LISTENERS (Buttons & Overlays)
   ===================================================== */

function initEventListeners() {
  // Cart open/close
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  // Continue shopping from empty cart
  document.getElementById("continueShoppingBtn").addEventListener("click", closeCart);

  // Checkout
  document.getElementById("checkoutBtn").addEventListener("click", handleCheckout);

  // Clear cart
  document.getElementById("clearCartBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  });

  // Modal close
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalOkBtn").addEventListener("click", closeModal);
  document.getElementById("modalOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modalOverlay")) closeModal();
  });

  // Close cart on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeModal();
    }
  });
}

/* =====================================================
   INIT — Entry point
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render initial product grid
  renderProducts();

  // 2. Sync cart from localStorage
  updateCartUI();

  // 3. Set up all UI interactions
  initFilters();
  initNavbarScroll();
  initMobileMenu();
  initContactForm();
  initScrollAnimations();
  initEventListeners();

  console.log("🛒 EliteCart initialized. Cart items loaded:", cart.length);
});
