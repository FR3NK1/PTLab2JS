const db = require("../module/pool");

const getProducts = (req, res) => {
  db.pool.query("SELECT * FROM shop_product", (err, result) => {
    if (err) {
      throw err;
    }
    const cart = req.session.cart ?? [];
    const products = result.rows.map((item) => ({
      ...item,
      ...{ isInCart: cart.some((cartItem) => cartItem.id === item.id) },
    }));

    res.render("index", {
      products,
      cart,
    });
  });
};

const getCartProducts = (req, res) => {
  db.pool.query("SELECT * FROM shop_product", (err, result) => {
    if (err) {
      throw err;
    }
    const cart = req.session.cart ?? [];
    const products = result.rows.map((item) => ({
      ...item,
      ...{ isInCart: cart.includes(item.id) },
    }));

    const cartProducts = cart.map((cartItem) => ({
      id: cartItem.id,
      name: products.find((product) => product.id === cartItem.id).name,
      price:
        products.find((product) => product.id === cartItem.id).price *
        cartItem.quantity,
      quantity: cartItem.quantity,
    }));

    const totalSum = cartProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const saleTotalSum = cart.length > 1 ? totalSum * 0.9 : 0;

    res.render("cart", {
      cartProducts,
      totalSum,
      saleTotalSum,
    });
  });
};

const addToCart = (req, res) => {
  const cart = req.session.cart ?? [];
  cart.push({ id: req.params.id, quantity: 1 });
  req.session.cart = cart;
  res.redirect("/");
};

const deleteFromCart = (req, res) => {
  const cart = req.session.cart ?? [];
  req.session.cart = cart.filter((cartItem) => cartItem.id !== req.params.id);
  res.redirect("/");
};

const plusCartItem = (req, res) => {
  const cart = req.session.cart ?? [];
  req.session.cart = cart.map((cartItem) => ({
    id: cartItem.id,
    quantity:
      cartItem.id === req.params.id ? cartItem.quantity + 1 : cartItem.quantity,
  }));
  res.redirect("/cart");
};

const minusCartItem = (req, res) => {
  const cart = req.session.cart ?? [];
  const newCart = cart.map((cartItem) => ({
    id: cartItem.id,
    quantity:
      cartItem.id === req.params.id ? cartItem.quantity - 1 : cartItem.quantity,
  }));

  req.session.cart = newCart.filter((cartItem) => cartItem.quantity > 0);
  res.redirect("/cart");
};

module.exports = {
  getProducts,
  addToCart,
  deleteFromCart,
  getCartProducts,
  plusCartItem,
  minusCartItem,
};
