import axios from "axios";
import {
  createMoviesFailure,
  createMoviesStart,
  createMoviesSuccess,
  deleteManyFailure,
  deleteManyStart,
  deleteManySuccess,
  deleteMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  uploadMovieFailure,
  uploadMovieStart,
  uploadMovieSuccess,
} from "./movieAction";

// xem
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("http://localhost:8800/api/movie", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};

// Xoá
export const deleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    //const res =
    await axios.delete("http://localhost:8800/api/movie/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMoviesSuccess(id));
  } catch (error) {
    dispatch(deleteMoviesFailure());
  }
};

//Thêm
export const createMovies = async (movie, dispatch) => {
  dispatch(createMoviesStart());
  try {
    const res = await axios.post("http://localhost:8800/api/movie", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMoviesSuccess(res.data));
  } catch (error) {
    dispatch(createMoviesFailure());
  }
};

// Cập nhật
export const updateMovies = async (movie, dispatch) => {
  dispatch(uploadMovieStart());
  try {
    const res = await axios.put(
      "http://localhost:8800/api/movie/" + movie._id,
      movie,
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(uploadMovieSuccess(res.data));
    console.log(uploadMovieSuccess(res.data));
  } catch (error) {
    dispatch(uploadMovieFailure());
  }
};

// Xoá nhiều
export const deleteMany = async (ids, dispatch) => {
  dispatch(deleteManyStart());
  try {
    const res = await axios.post(
      "http://localhost:8800/api/movie/delete-many",
      { ids },
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(deleteManySuccess(res.data));
    window.location.reload();
  } catch (error) {
    dispatch(deleteManyFailure());
  }
};
