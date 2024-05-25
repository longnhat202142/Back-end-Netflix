import { ArrowBackOutlined } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";

import "./list.css";

export default function List() {
  const history = useHistory();
  const { dispatch } = useContext(ListContext);
  const { id } = useParams();
  const [list, setList] = useState();
  // eslint-disable-next-line
  const [listMovies, setListMovies] = useState(null);
  const [movies, setMovies] = useState([]);
  const [options, setOptions] = useState([]);
  const [newList, setNewList] = useState(list);
  const handleChange = (e) => {
    const value = e.target.value;

    setNewList({ ...newList, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(id, newList, dispatch);
    alert("Cập nhật danh sách thành công");
    history.push("/lists");
  };

  useEffect(() => {
    const fetchData = async () => {
      const [resList, resMovies] = await Promise.all([
        axios.get("http://localhost:8800/api/list/find/" + id, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }),
        axios.get("http://localhost:8800/api/movie", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }),
      ]);
      if (resList.status === 200) {
        const data = resList.data;
        setList(data);
      }
      if (resMovies.status === 200) {
        setMovies(resMovies.data);
        const movies = resMovies.data;
        const genres = movies.map((movie) => movie.genre);
        const options = [...new Set(genres)];
        setOptions(options);
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, []);

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    const newSelectMovies = { ...listMovies, [e.target.name]: value };
    setNewList({
      ...newList,
      content: list.content.concat(newSelectMovies.content),
    });
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="productLeftTitle">
          <Link to="/lists">
            <div className="back">
              <ArrowBackOutlined />
            </div>
          </Link>
          <h1 className="productTitle">Danh sách</h1>
        </div>

        <Link to="/newList" style={{ display: "inline-block" }}>
          <button className="productAddButton">Thêm danh sách</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productInfoKey">Tiêu đề</span>
            <span className="productName">{list?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{list?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Kiểu</span>
              <span className="productInfoValue">{list?.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tiêu đề </label>
            <input
              type="text"
              placeholder={list?.title}
              onChange={handleChange}
              name="title"
            />
            <label>Thể loại</label>
            {/* <input
              type="text"
              placeholder={list?.genre}
              onChange={handleChange}
              name="genre"
            /> */}
            <select
              name="genre"
              id="genre"
              onChange={handleChange}
              value={list?.genre}
            >
              {options &&
                options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
            </select>
            <label>Kiểu</label>
            <select name="type" onChange={handleChange} value={list?.type}>
              <option value="">--- Thể loại ---</option>
              <option value="movies">Phim</option>
              <option value="series">Series</option>
            </select>
            {/* <input
              type="text"
              placeholder={list.type}
              onChange={handleChange}
              name="type"
            /> */}

            <label>Nội dung</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "250px" }}
            >
              {movies.length > 0 &&
                list.content.length > 0 &&
                movies.map((movie) => (
                  <option
                    key={movie._id}
                    value={movie._id}
                    className={list.content.includes(movie._id) ? "active" : ""}
                  >
                    {movie.title}
                  </option>
                ))}
            </select>
            <button className="productButton" onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
