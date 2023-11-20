const express = require("express");

const shopController = require("./src/queries");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/shop", shopController.getPurchase);

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
