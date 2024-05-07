import { useContext } from "react";
import "./Login.scss";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  email: yup.string().required("Không được bỏ trống"),
  password: yup.string().required("Không được bỏ trống"),
});
export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { dispatchAu } = useContext(AuthContext);

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
    const payload = { ...values };
    console.log(payload);

    const result = await login({ ...values }, dispatchAu);
    if (result?.response) {
      const errorRes = result?.response?.data;
      setError(errorRes.key, errorRes);
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

          <Link to={"/register"}>
            <button className="loginButton">Đăng ký</button>
          </Link>
        </div>
      </div>

      <div className="container">
        <form action="">
          <h1>Đăng nhập</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            {...register("password")}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}

          <button className="loginButton" onClick={handleSubmit(onSubmit)}>
            Đăng nhập
          </button>
          <Link to={"/send-email"}>
            <button className="forgetBtn">Quên mật khẩu</button>
          </Link>
          <div className="login-now">
            Bạn mới tham gia Netflix? <Link to={"/register"}>Đăng kí ngay</Link>
            <p>
              Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải
              là robot. <Link>Tìm hiểu thêm</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
