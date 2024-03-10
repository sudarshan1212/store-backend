const express = require("express");

const router = express.Router();
const {
  getOrder,
  updateOrders,
  postOrders,
  getOrderId,
  deleteOrders,
} = require("./controllers/orderControllers");

const validateToken = require("./middleware/decode");

router.use(validateToken);

router.get("/", getOrder);
router.post("/", postOrders);
router.get("/:orderId", getOrderId);
router.put("/:orderId", updateOrders);
router.delete("/:orderId", deleteOrders);

module.exports = router;
