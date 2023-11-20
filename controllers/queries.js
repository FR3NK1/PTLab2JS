const db = require("../module/pool");

const getProducts = (req, res) => {
  db.pool.query("SELECT * FROM shop_product", (err, result) => {
    if (err) {
      throw err;
    }

    res.render("index", {
      products: result.rows,
      session: JSON.stringify(req.session.cart),
    });
  });
};

const addToCart = (req, res) => {
  const cart = req.session.cart ?? [];
  cart.push(req.params.id);
  req.session.cart = cart;
  res.redirect("/");
};

module.exports = { getProducts, addToCart };
