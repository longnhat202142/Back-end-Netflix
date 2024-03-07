import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./newList.css";

export default function NewList() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useHistory();
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };
  console.log(list);
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Danh sách mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Tiêu đề</label>
          <input
            type="text"
            placeholder="Tiêu đè"
            name="title"
            onChange={handleChange}
          />

          <label>Thể loại</label>
          <input
            type="text"
            placeholder="Thể loại"
            name="genre"
            onChange={handleChange}
          />

          <label>Kiểu</label>
          <select value="type" onChange={handleChange}>
            <option>-- Chọn kiểu --</option>
            <option value="movie">Phim</option>
            <option value="series">Series</option>
          </select>

          <label>Nội dung</label>
          <select
            multiple
            name="content"
            onChange={handleSelect}
            style={{ height: "250px" }}
          >
            {movies.map((movie, index) => (
              <option key={index} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Thêm
        </button>
      </form>
    </div>
  );
}
