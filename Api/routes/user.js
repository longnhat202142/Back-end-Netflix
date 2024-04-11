const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const { handleDecodePassword } = require("../utils");

//Cập nhật
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Cập nhật lai tài khoản !!!");
  }
});

// Xoá
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("Người dùng đã bị xoá !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn chỉ có thể xoá tài khoản của mình !!!");
  }
});

//Xem thông tin  bản thân
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Lấy ra tất cả (đối với ai được cấp quyền Admin)
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find(req.params.id).limit(5)
        : await User.find();
      // const newUsers = users.map((user) => {
      //   return {
      //     ...user,
      //     password: handleDecodePassword(user.password),
      //   };
      // });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép xem tất cả người dùng !!!");
  }
});

// Thêm người dùng
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Xoá nhiều
router.post("/delete-many", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const ids = req.body.ids;
      await User.deleteMany({ _id: { $in: ids } });
      res.status(200).json("Người dùng đã được xoá !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

module.exports = router;
