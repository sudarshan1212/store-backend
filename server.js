const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const errorHandler = require("./middleware/errorhandler");
app.use(errorHandler);
const dbConnection = require("./config/dbConnection");

const port = process.env.PORT || 500;
//appuse
app.use(express.json());
dbConnection();
app.use("/products", require("./productRouter"));
app.use("/orders", require("./ordersROuter"));
app.use("/users", require("./userRoutes"));
//
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 400;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});
app.listen(port, () => {
  console.log(`THE SERVER IS RUNNING ON: ${port}`);
});
