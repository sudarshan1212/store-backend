const expressAsyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");

//GET
const getOrder = expressAsyncHandler(async (req, res, next) => {
  const findOrder = await Order.find({ user_id: req.user.id })
    .populate("productId")
    .select("productId _id quantity");
  res.status(200).json({
    count: findOrder.length,
    orders: findOrder.map((result) => {
      return {
        _id: result._id,
        product: result.productId,
        quantity: result.quantity,
      };
    }),
  });
});

//GETEID
const getOrderId = expressAsyncHandler(async (req, res, next) => {
  const findOrder = await Order.findById(req.params.orderId)
    .populate("productId")
    .select("productId _id quantity");
  res.status(200).json(findOrder);
});

//POST
const postOrders = expressAsyncHandler(async (req, res, next) => {
  const findProduct = await Product.findById(req.body.productId);

  const { productId, quantity } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error("all fields are mandtory");
  }
  if (!findProduct) {
    throw new Error("no id found");
  }
  if (findProduct.id === productId) {
    const product = await Order.create({
      productId,
      quantity,
      prodcutName: findProduct.name,
      user_id: req.user.id,
    });
    res.status(200).json(product);
  }
});

//UPDATE
const updateOrders = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) {
    throw new Error("there is no order found");
  }
  const update = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
    new: true,
  });
  res.status(200).json(update);
});

//DELETE
const deleteOrders = expressAsyncHandler(async (req, res, next) => {
  const findProduct = await Product.findById(req.body.productId);
  const productName = findProduct.name;
  await Order.deleteOne({ _id: req.params.orderId });
  res.status(200).json({ message: `dlt ${productName}` });
});
module.exports = {
  getOrder,
  getOrderId,
  postOrders,
  updateOrders,
  deleteOrders,
};
