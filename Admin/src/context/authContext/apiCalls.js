import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./authAction";
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8800/api/auth/login", user);

    if (res.data.info.isAdmin) {
      dispatch(loginSuccess(res.data));
    }
  } catch (error) {
    dispatch(loginFailure());
    return error.response.data;
  }
};
