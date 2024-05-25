import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./newList.css";

const schema = yup.object().shape({
  title: yup.string().required("Không được bỏ trống"),
});
export default function NewList() {
  const history = useHistory();
  const [list, setList] = useState(null);
  const [options, setOptions] = useState([]);
  const { dispatch } = useContext(ListContext);
  const [movieTitles, setMovieTiles] = useState([]);
  // eslint-disable-next-line

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/movie", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (res.status === 200) {
          const movies = res.data;
          const genres = movies.map((movie) => movie.genre);
          const options = [...new Set(genres)];
          const movieTitles = movies.map((movie) => {
            const { _id, title } = movie;
            return {
              id: _id,
              title,
            };
          });
          setMovieTiles(movieTitles);
          setOptions(options);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
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
      genre: list.genre,
      type: list.type,
      content: list.content,
    };
    const error = await createList(payload, dispatch);
    if (error?.response) {
      const erroMsg = error?.response?.data;
      setError("title", erroMsg);
    }
    alert("Thêm thành công phim mới !");
    history.push("/lists");
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };
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
            {...register("title")}
          />
          {errors.title && (
            <span style={{ color: "red" }}>{errors.title.message}</span>
          )}
          <label>Thể loại</label>
          {/* <input
            type="text"
            placeholder="Thể loại"
            name="genre"
            onChange={handleChange}
          /> */}
          <select name="genre" id="genre" onChange={handleChange}>
            {options &&
              options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>

          <label>Kiểu</label>
          <select onChange={handleChange} name="type" id="type">
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
            {movieTitles.map((title) => (
              <option key={title.id} value={title.id}>
                {title.title}
              </option>
            ))}
          </select>
        </div>
        <button className="addProductButton" onClick={handleSubmit(onSubmit)}>
          Thêm
        </button>
      </form>
    </div>
  );
}
