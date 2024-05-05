const jwt = require("jsonwebtoken");

// Cấp quyền để sửa đổi dữ liệu
function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Không có dữ liệu mã hoá !!!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("loi");
  }
}

module.exports = verify;
