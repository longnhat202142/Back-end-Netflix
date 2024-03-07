import { useContext, useState } from "react";
import "./newProduct.css";
import { createMovies } from "../../context/movieContext/apiCalls";

import { MovieContext } from "../../context/movieContext/movieContext";
import { useHistory } from "react-router-dom";
export default function NewProduct() {
  const [movie, setMovie] = useState(null);

  const { dispatch } = useContext(MovieContext);
  const history = useHistory();
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovies(movie, dispatch);
    history.push("/movies");
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Phim mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Ảnh</label>
          <input type="text" id="img" name="img" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Ảnh tiêu đề</label>
          <input
            type="text"
            id="imgTitle"
            name="imgTitle"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Hình ảnh thu nhỏ</label>
          <input type="text" id="imgSm" name="imgSm" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Tiêu đề</label>
          <input
            type="text"
            placeholder="Joker && Lady Gaga"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Mô tả</label>
          <input
            type="text"
            placeholder="Mô tả"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Năm sản xuất</label>
          <input
            type="text"
            placeholder="Năm sản xuất"
            name="year"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Thể loại</label>
          <input
            type="text"
            placeholder="Thể loại"
            name="genre"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Độ tuổi</label>
          <input
            type="text"
            placeholder="Độ tuổi"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Loạt phim ?</label>
          <select name="active" id="isSeries" onChange={handleChange}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="addProductItem">
          <label>Tralier</label>
          <input type="text" name="trailer" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input type="text" name="video" onChange={handleChange} />
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Thêm
        </button>
      </form>
    </div>
  );
}
