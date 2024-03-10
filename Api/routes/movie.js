const router = require("express").Router();
const verify = require("../verifyToken");
const Movie = require("../models/movie");

//Thêm phim
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

// Cập nhật phim
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

// Xoá phim
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("Phim đã được xoá !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

//Xem thông tin phim
router.get("/find/:id", verify, async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    console.log(movie);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Lấy ngẫu nhiên
router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Lấy tất cả

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
