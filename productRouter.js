const express = require("express");
const {
  getProduct,
  getProductId,
  postProduct,
  patchProduct,
  deleteProduct,
} = require("./controllers/productControllers");
const router = express.Router();
// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/webp" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

router.get("/", getProduct).post("/", postProduct);
router.get("/:productId", getProductId);
router.patch("/:productId", patchProduct);
router.delete("/:productId", deleteProduct);
module.exports = router;
