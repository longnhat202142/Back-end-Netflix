const router = require("express").Router();
const User = require("../models/user");

// Mã hoá dữ liệu gởi đi
const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");
//Mã hoá mật khẩu
const CryptoJS = require("crypto-js");
const user = require("../models/user");

//Đăng kí
router.post("/register", async (req, res) => {
  const checkEmail = await user.findOne({ email: req.body.email });
  const checkUserName = await user.findOne({ username: req.body.username });
  console.log(checkEmail);
  if (checkEmail) {
    return res.status(401).json({
      status: "ERROR",
      message: "Email này đã được đăng kí !!!",
      key: "email",
    });
  }
  if (checkUserName) {
    return res.status(401).json({
      status: "ERROR",
      message: "Tên người dùng đã được đăng kí !!!",
      key: "username",
    });
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,

    // Mã hoá mật khẩu
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  // console.log(newUser);
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/send-email", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  //console.log(user);
  if (!user) {
    return res.status(401).json({ status: "ERROR", message: "Sai email !!!" });
  }
  // Giải mã mật khẩu
  const decrypted = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
  const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
  console.log(passworDecrypted);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: '"Kết quả" <20T1020495@husc.edu.vn>', // sender address
    to: req.body.email, // list of receivers
    subject: `Mật khẩu  của tài khoản\`${user.username}\``, // Subject line
    text: "G", // plain text body
    html: `<h1 style="color: red;">Mật khẩu : ${passworDecrypted}</h1>`,
  });
  return res.status(200).json({
    status: "OK",
    message:
      "Mật khẩu đã được gửi về email của bạn. Vui lòng kiểm tra email của bạn.!",
  });
});

//Đăng nhập
router.post("/login-check", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // const checkUserName = await user.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Email đăng nhập không chính xác",
        key: "email",
      });
    }

    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
    if (passworDecrypted !== req.body.password) {
      return res.status(401).json({
        status: "error",
        message: "Mật khẩu không chính xác",
        key: "password",
      });
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

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Sai email !!!");
    }

    //giải mã mật khẩu
    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    // So sánh mật khẩu
    const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
    if (passworDecrypted !== req.body.password) {
      return res.status(401).json("Sai mật khẩu !!!");
    }

    //Kiểm tra có phải Admin không mới cho đăng nhập
    const checkAdmin = await User.findOne({ isAdmin: user.isAdmin });
    console.log(checkAdmin.isAdmin);
    if (!checkAdmin.isAdmin) {
      return res.status(401).json("Bạn không phải là Admin!!!");
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
