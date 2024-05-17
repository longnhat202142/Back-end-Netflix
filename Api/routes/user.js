const router = require("express").Router();
const verify = require("../verifyToken");
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const { handleDecodePassword } = require("../utils");
const user = require("../models/user");

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
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
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
        ? await User.find(req.params.id).sort({ _id: -1 }).limit(5)
        : await User.find().sort({ _id: -1 });
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
    const checkEmail = await user.findOne({ email: newUser.email });
    const checkUserName = await user.findOne({ username: newUser.username });
    if (checkUserName)
      return res.status(400).json({
        status: "error",
        message: "Tên người dùng đã tồn tại",
        key: "username",
      });
    else if (checkEmail)
      return res.status(400).json({
        status: "error",
        message: "Email này đã tồn tại",
        key: "email",
      });

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

// Thay đổi mật khẩu
router.post("/change-password/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const id = req.params.id;
      const { oldPassword, newPassword, confirmPassword } = req.body;
      if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json("Không được bỏ trống.");
      }
      if (newPassword !== confirmPassword) {
        return res.status(400).json("Xác nhận mật khẩu không trùng khớp.");
      }
      const user = await User.findById(id);
      if (user) {
        // giải mã rồi so sánh mật khẩu cũ trong db và payload gửi lên
        const decrypted = CryptoJS.AES.decrypt(
          user.password,
          process.env.SECRET_KEY
        );
        const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
        if (passworDecrypted !== oldPassword) {
          return res.status(400).json({
            status: "ERROR",
            message: "Mật khẩu cũ không chính xác !!!",
          });
        }

        // mã hoá mật khẩu mới
        const encodedNewPassword = CryptoJS.AES.encrypt(
          newPassword,
          process.env.SECRET_KEY
        ).toString();

        const newUser = await User.findByIdAndUpdate(
          id,
          { password: encodedNewPassword },
          { new: true }
        );
        if (newUser) {
          res.status(200).json({
            status: "OK",
            message: "Đổi mật khẩu thành công.",
            data: newUser,
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// Tìm kiếm trong user
router.get("/find-user", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const search = req.query.key;

      const users = await User.find();
      const filterUser = users.filter((user) => user.username.includes(search));

      res.status(200).json(filterUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
