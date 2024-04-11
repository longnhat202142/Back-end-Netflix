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
  console.log(req.body);
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        req.body,
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
    // console.log(movie);
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

router.get("/find", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const search = req.query.key;
      const movies = await Movie.find();
      const filteredMovies = movies.filter((movie) =>
        movie.title.includes(search)
      );

      res.status(200).json(filteredMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// Xoá nhiều
router.post("/delete-many", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const ids = req.body.ids;
      await Movie.deleteMany({ _id: { $in: ids } });
      res.status(200).json("Movie đã được xoá !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Bạn không được phép!!!");
  }
});

module.exports = router;
