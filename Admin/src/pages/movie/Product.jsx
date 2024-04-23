import { Publish } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { updateMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import { ArrowBackOutlined } from "@mui/icons-material";
import "./product.css";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
export default function Product() {
  // const location = useLocation();
  // const movie = location.movie;
  const history = useHistory();
  //const [update, setUpdate] = useState(movie);
  const { id } = useParams();
  const { dispatch } = useContext(MovieContext);

  const [movie, setMovie] = useState();
  const handleChange = (e) => {
    const value = e.target.value;

    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleUpdateMovie = (e) => {
    e.preventDefault();
    updateMovies(movie, dispatch);
    history.push("/movies");
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/movie/find/" + id,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data;
        setMovie({ ...data });
      }
    };
    fetchData();
  });

  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="productLeftTitle">
          <Link to="/movies">
            <div className="back">
              <ArrowBackOutlined />
            </div>
          </Link>
          <h1 className="productTitle">Phim</h1>
        </div>
        <Link to="/newmovie">
          <button className="productAddButton">Thêm phim mới</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie?.img} alt="" className="productInfoImg" />
            <span className="productName">{movie?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{movie?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Năm sản xuất:</span>
              <span className="productInfoValue">{movie?.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Độ tuổi</span>
              <span className="productInfoValue">+{movie?.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tiêu đề phim</label>
            <input
              type="text"
              placeholder={movie?.title}
              onChange={handleChange}
              name="title"
            />
            <label>Năm sản xuất</label>
            <input
              type="text"
              placeholder={movie?.year}
              onChange={handleChange}
              name="year"
            />

            <label>Thể loại</label>
            <input
              type="text"
              placeholder={movie?.genre}
              onChange={handleChange}
              name="genre"
            />
            <label>Độ tuổi</label>
            <input
              type="text"
              placeholder={movie?.limit}
              onChange={handleChange}
              name="limit"
            />
            <label>Trailer</label>
            <input
              type="text"
              placeholder={movie?.trailer}
              onChange={handleChange}
              name="trailer"
            />
            <label>Video</label>
            <input
              type="text"
              placeholder={movie?.video}
              onChange={handleChange}
              name="video"
            />

            <label>Hình ảnh</label>
            <input type="text" placeholder={movie?.img} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie?.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleUpdateMovie}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
