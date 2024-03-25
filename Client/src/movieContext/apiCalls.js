import httpClient from "../api/httpClient";
import {
  findMoviesFailure,
  findMoviesStart,
  findMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./movieAction";

// xem
export const searchMoviesApi = async (key, dispatch) => {
  dispatch(findMoviesStart());
  try {
    const res = await httpClient.get(`/movie/find?key=${key}`, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(findMoviesSuccess(res.data));
  } catch (error) {
    dispatch(findMoviesFailure());
  }
};

// xem
export const getMoviesRandom = async (type, genre, dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await httpClient.get(
      `/list/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
      {
        headers: {
          token:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDYxMGMyODJmMTRmODU1MWE5MzkzZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDEyNjY0NH0.gMYhwfh4xUT-DW2ZRbilF1LBSMDLSAQfc2qn_tTwchY",
        },
      }
    );
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
};
