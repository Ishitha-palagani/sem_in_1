
import { useState, useEffect } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Studio Headphones", category: "Electronics", price: 2499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdii7Dw_4vy3savqwFtPsYaQViMe-HNx0YRctJB59K0A&s=10" },
  { id: 2, name: "Classic Wristwatch", category: "Accessories", price: 3499, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600" },
  { id: 3, name: "Everyday Sneakers", category: "Footwear", price: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { id: 4, name: "Urban Backpack", category: "Accessories", price: 1299, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600" },
  { id: 5, name: "Modern Sunglasses", category: "Accessories", price: 799, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600" },
  { id: 6, name: "Portable Speaker", category: "Electronics", price: 1599, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600" },
];

function App() {
  // CART STATE
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartora-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // UI STATES
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cartora-cart", JSON.stringify(cart));
  }, [cart]);

  // CATEGORIES
  const categories = ["All", "Electronics", "Accessories", "Footwear"];

  // SEARCH, FILTER AND SORT
  const filteredProducts = products
    .filter((product) =>
      category === "All" || product.category === category
    )
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // CHANGE QUANTITY
  const changeQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // CART CALCULATIONS
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="store">

      <div className="announcement">
        A LITTLE SOMETHING FOR YOUR EVERYDAY.
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#" className="brand">
          CARTORA<span>.</span>
        </a>

        <nav className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
        </nav>

        <button
          className="cart-trigger"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Bag ({totalItems})
        </button>
      </header>

      <main>

        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">THE EVERYDAY COLLECTION</p>

            <h1>
              Things worth
              <br />
              keeping.
            </h1>

            <p className="hero-description">
              Thoughtfully picked essentials for the way you live,
              work and move.
            </p>

            <a href="#shop" className="shop-link">
              Explore collection <span>↗</span>
            </a>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200"
              alt="Everyday collection"
            />
          </div>
        </section>

        {/* SHOP */}
        <section className="shop-section" id="shop">

          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>Our collection</h2>
            </div>

            <p className="product-count">
              {filteredProducts.length} products
            </p>
          </div>

          {/* CATEGORY FILTER */}
          <div className="filters">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "filter active" : "filter"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* SEARCH AND SORT */}
          <div className="shop-tools">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* PRODUCT GRID */}
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>

                  <div className="product-image">
                    <img src={product.image} alt={product.name} />

                    <button
                      className="quick-add"
                      onClick={() => addToCart(product)}
                    >
                      + Add
                    </button>
                  </div>

                  <div className="product-info">
                    <div>
                      <p className="product-category">
                        {product.category}
                      </p>

                      <h3>{product.name}</h3>
                    </div>

                    <p className="product-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                </article>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

        </section>

        {/* ABOUT */}
        <section className="about-section" id="about">
          <p className="eyebrow">A THOUGHTFUL WAY TO SHOP</p>

          <h2>
            Less searching.
            <br />
            More finding.
          </h2>

          <p>
            A collection of everyday things, brought together in one place.
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#" className="brand">
          CARTORA<span>.</span>
        </a>

        <p>Simple things. Better choices.</p>

        <p>© 2026 CARTORA</p>
      </footer>

      {/* CART PANEL */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">
              <h2>Your bag ({totalItems})</h2>

              <button onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>

            {/* EMPTY CART */}
            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Your bag is currently empty.</p>

                <button onClick={() => setCartOpen(false)}>
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                {/* CART ITEMS */}
                <div className="cart-items">

                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>

                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        {/* QUANTITY */}
                        <div className="quantity-control">
                          <button
                            onClick={() =>
                              changeQuantity(item.id, -1)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              changeQuantity(item.id, 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        {/* REMOVE */}
                        <button
                          className="remove-item"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  ))}

                </div>

                {/* CART SUMMARY */}
                <div className="cart-bottom">

                  <div className="cart-total">
                    <span>Total</span>

                    <strong>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      alert("Checkout feature coming soon!")
                    }
                  >
                    Continue to checkout
                  </button>

                  <button
                    className="remove-item"
                    onClick={clearCart}
                  >
                    Clear entire cart
                  </button>

                  <p>Taxes and shipping calculated at checkout.</p>

                </div>
              </>
            )}

          </aside>
        </div>
      )}

    </div>
  );
}

export default App;
