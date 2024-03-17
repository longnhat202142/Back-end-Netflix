import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import storage from "../../firebase.js";
import "./newProduct.css";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [uploaded, setUploaded] = useState(0);

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

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_change",
        (snaphot) => {
          const progress =
            (snaphot.bytesTransferred / snaphot.totalBytes) * 100;
          console.log("Upload " + progress + "  % doen");
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
    ]);
  };

  console.log(movie);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Phim mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Ảnh</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Ảnh tiêu đề</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Hình ảnh thu nhỏ</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
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
        {uploaded === 3 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Thêm
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
