const expressAsyncHandler = require("express-async-handler");
const Product = require("../model/productModel");
// const multer = require("multer");



//get
const getProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.find().select("name price _id");
  res.status(200).json({ count: product.length, items: product });
});

//Getby id
const getProductId = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).select(
    "name price _id"
  );
  res.status(200).json(product);
});

//Post
const postProduct = expressAsyncHandler(async (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400);
    throw new Error("all fields are mandtory");
  }
  const productFind = await Product.findOne({ name });
  if (productFind) {
    res.status(400);
    throw new Error("product is already used");
  }
  const product = await Product.create({
    name,
    price,

  });
  // const productView = product.select("name price _id");

  res.status(200).json(product);
});

//Patch
const patchProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(400);
    throw new Error("no products found");
  }
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(200).json(updateProduct);
});

//Delete
const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  const productNmae = product.name;
  await Product.deleteOne({ _id: req.params.productId });
  res.status(200).json({ message: ` deleted ${productNmae} ` });
});

module.exports = {
  getProduct,
  getProductId,
  postProduct,
  patchProduct,
  deleteProduct,
};
