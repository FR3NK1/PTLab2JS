const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");
const app = express();

const shopController = require("./controllers/queries");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  session({
    secret: "shop cart",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

app.get("/cart/add/:id", shopController.addToCart);
app.get("/cart/delete/:id", shopController.deleteFromCart);
app.get("/", shopController.getProducts);
app.get("/cart", shopController.getCartProducts);
app.get("/cart/plusCartItem/:id", shopController.plusCartItem);
app.get("/cart/minusCartItem/:id", shopController.minusCartItem);

app.post("/buyProducts", urlencodedParser, shopController.buyProducts);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
