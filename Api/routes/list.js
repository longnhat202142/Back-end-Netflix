const router = require("express").Router();
const verify = require("../verifyToken");
const List = require("../models/list");
const list = require("../models/list");

//Thêm danh sách
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = req.body;
    try {
      const checkList = await list.findOne({ title: newList.title });
      if (checkList)
        return res.status(400).json({
          status: "error",
          message: "Tên tiêu đề đã tồn tại",
        });
      const saveList = await newList.save();
      res.status(200).json(saveList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

// Xoá danh sách
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("Danh sách đã được xoá !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

router.post("/delete-many", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const ids = req.body.ids;
      await List.deleteMany({ _id: { $in: ids } });
      res.status(200).json("Danh sách đã được xoá !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

// Lấy danh sách
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 8 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 8 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([
        {
          $sample: { size: 8 },
        },
      ]);
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Xem thông tin để Upload lại trang
router.get("/find/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const id = req.params.id;
      const list = await List.findById(id);

      res.status(200).json(list);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

// Cập nhật lại danh sách
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateList = await List.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json(updateList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép sửa !!!");
  }
});

// Tìm kiếm trong list trong Admin
router.get("/find-list", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const search = req.query.key;

      const lists = await List.find();
      const filterList = lists.filter((list) => list.title.includes(search));

      res.status(200).json(filterList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
