import { useContext, useState } from "react";
import "./Login.scss";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatchAu } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatchAu);
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

          <button className="loginButton">Đăng nhập</button>
        </div>
      </div>

      <div className="container">
        <form action="">
          <h1>Đăng nhập</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Đăng nhập
          </button>

          <div className="login-now">
            Bạn mới tham gia Netflix? <Link to={"/register"}>Đăng kí ngay</Link>
            <p>
              Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải
              là robot. <a href="">Tìm hiểu thêm</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
