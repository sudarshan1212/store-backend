const express = require("express");
const { login, register, current } = require("./controllers/userControllers");

const router = express.Router();
const validateToken = require("./middleware/decode");

router.post("/register", register);
router.post("/login", login);
router.get("/current", validateToken,current);
module.exports = router;
