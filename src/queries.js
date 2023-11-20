const db = require("../postgres-config");

const getPurchase = (req, res) => {
  db.pool.query("SELECT * FROM shop_purchase", (err, result) => {
    if (err) {
      throw err;
    }

    res.status(200).json(result.rows);
  });
};

module.exports = { getPurchase };
