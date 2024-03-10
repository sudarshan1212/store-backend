const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

//register
const register = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new Error("All filed are mandorty");
  }
  const findEmail = await User.findOne({ email });
  if (findEmail) {
    throw new Error("Email lready exsist");
  }
  const hashPass = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashPass });
  if (user) {
    res
      .status(200)
      .json({ _id: user.id, name: user.username, email: user.email });
  } else {
    throw new Error("registeration no t comp");
  }
});

//login
const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandor");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const acessToken = jwt.sign(
      {
        user: {
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SERVER,
      { expiresIn: "15m" }
    );
    res.status(200).json(acessToken);
  } else {
    res.status(400);
    throw new Error("user dootn exsit");
  }
});

//current
const current = (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports = { register, current, login };
