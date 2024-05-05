import { useContext, useState } from "react";
import "./PassChange.scss";
import { changePassword, updateUser } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
const schema = yup.object().shape({
  oldPassword: yup.string().required("Không được bỏ trống"),
  newPassword: yup.string().required("Không được bỏ trống"),
  confirmPassword: yup
    .string()
    .required("Không được bỏ trống")
    .oneOf(
      [yup.ref("newPassword"), null],
      "Xác nhận mật khẩu không trùng khớp"
    ),
});
export default function ChangePass() {
  // eslint-disable-next-line
  const navigate = useNavigate();
  const { dispatchAu } = useContext(AuthContext);
  const [user] = useState(JSON.parse(localStorage.getItem("user")).info);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      const res = await changePassword(user._id, values, dispatchAu);
      if (res.status === "OK") {
        alert("Đổi mật khẩu thành công");
        navigate("/account");
      } else if (res.status === "ERROR") {
        setError("oldPassword", res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"
            alt=""
          />

          <Link to={"/account"}>
            <button className="loginButton">Trở về</button>
          </Link>
        </div>
      </div>

      <div className="container">
        <form action="">
          <h1>Đổi mật khẩu</h1>
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            name="oldPassword"
            {...register("oldPassword")}
          />
          {errors.oldPassword && (
            <span style={{ color: "red" }}>{errors.oldPassword.message}</span>
          )}
          <input
            type="password"
            placeholder="Mật khẩu mới"
            name="newPassword"
            {...register("newPassword")}
          />
          {errors.newPassword && (
            <span style={{ color: "red" }}>{errors.newPassword.message}</span>
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </span>
          )}
          <button className="loginButton" onClick={handleSubmit(onSubmit)}>
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
}
