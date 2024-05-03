import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createMovies } from "../../context/movieContext/apiCalls.js";
import { MovieContext } from "../../context/movieContext/movieContext.js";
import storage from "../../firebase.js";
import "./newMovie.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Không được bỏ trống"),
  desc: yup.string().required("Không được bỏ trống"),
  trailer: yup.string().required("Không được bỏ trống"),
  video: yup.string().required("Không được bỏ trống"),
  year: yup
    .string()
    .required("Không được bỏ trống.")
    .matches(/^\d{4}$/, "Năm không hợp lệ."),
  limit: yup
    .string()
    .required("Không được bỏ trống.")
    .matches(/^(1[89]|[2-9]\d)$/, "Tuổi không hợp lệ"),
  genre: yup.string().required("Không được bỏ trống"),
});
export default function NewMovie() {
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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (values) => {
    const payload = {
      ...values,
      img: movie.img,
      imgTitle: movie.imgTitle,
      imgSm: movie.imgSm,
      isSeries: movie.active,
    };

    try {
      createMovies(payload, dispatch);
      alert("Thêm thành công phim mới !");
      history.push("/movies");
    } catch (error) {
      setError("title", error.response.data);
    }
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
            {...register("title")}
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
        </div>
        <div className="addProductItem">
          <label>Mô tả</label>
          <input
            type="text"
            placeholder="Mô tả"
            name="desc"
            {...register("desc")}
          />
          {errors.desc && (
            <span style={{ color: "red" }}>{errors.desc.message}</span>
          )}
        </div>
        <div className="addProductItem">
          <label>Năm sản xuất</label>
          <input
            type="text"
            placeholder="Năm sản xuất"
            name="year"
            {...register("year")}
          />
          {errors.year && (
            <span style={{ color: "red" }}>{errors.year.message}</span>
          )}
        </div>

        <div className="addProductItem">
          <label>Thể loại</label>
          <input
            type="text"
            placeholder="Thể loại"
            name="genre"
            {...register("genre")}
          />
          {errors.genre && (
            <span style={{ color: "red" }}>{errors.genre.message}</span>
          )}
        </div>

        <div className="addProductItem">
          <label>Độ tuổi</label>
          <input
            type="text"
            placeholder="Độ tuổi"
            name="limit"
            {...register("limit")}
          />
          {errors.limit && (
            <span style={{ color: "red" }}>{errors.limit.message}</span>
          )}
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
          <input type="text" name="trailer" {...register("trailer")} />
          {errors.trailer && (
            <span style={{ color: "red" }}>{errors.trailer.message}</span>
          )}
        </div>

        <div className="addProductItem">
          <label>Video</label>
          <input type="text" name="video" {...register("video")} />
          {errors.video && (
            <span style={{ color: "red" }}>{errors.video.message}</span>
          )}
        </div>
        {uploaded === 3 ? (
          <button className="addProductButton" onClick={handleSubmit(onSubmit)}>
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
