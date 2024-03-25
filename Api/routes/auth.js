const router = require("express").Router();
const User = require("../models/user");

// Mã hoá dữ liệu gởi đi
const jwt = require("jsonwebtoken");

//Mã hoá mật khẩu
const CryptoJS = require("crypto-js");

//Đăng kí
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,

    // Mã hoá mật khẩu
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  console.log(newUser);
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Sai email !!!");
    }

    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
    if (passworDecrypted !== req.body.password) {
      return res.status(401).json("Sai mật khẩu !!!");
    }

    const { ...info } = user._doc;

    // Mã hoá id và quyền
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY
    );

    res.status(200).json({ info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
