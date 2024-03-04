import { Link } from "react-router-dom";
import "./product.css";

import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

export default function Product() {
  const location = useLocation();
  const movie = location.movie;

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Phim</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Thêm phim mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Năm sản xuất:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Độ tuổi</span>
              <span className="productInfoValue">+{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tiêu đề phim</label>
            <input type="text" placeholder={movie.title} />
            <label>Năm sản xuất</label>
            <input type="text" placeholder={movie.year} />

            <label>Thể loại</label>
            <input type="text" placeholder={movie.genre} />
            <label>Độ tuổi</label>
            <input type="text" placeholder={movie.limit} />
            <label>Trailer</label>
            <input type="text" placeholder={movie.trailer} />
            <label>Video</label>
            <input type="text" placeholder={movie.video} />

            <label>Hình ảnh</label>
            <input type="text" placeholder={movie.img} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  );
}
