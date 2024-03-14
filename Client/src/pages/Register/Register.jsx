import { useRef, useState } from "react";
import "./Register.scss";

import httpClient from "../../api/httpClient";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleSignUp = () => {
    navigate("/login");
  };
  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      await httpClient.post("/auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {}
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://images.ctfassets.net/y2ske730sjqp/6bhPChRFLRxc17sR8jgKbe/6fa1c6e6f37acdc97ff635cf16ba6fb3/Logos-Readability-Netflix-logo.png"
            alt=""
          />

          <button className="loginButton" onClick={handleSignUp}>
            Đăng nhập
          </button>
        </div>
      </div>

      <div className="container">
        <h1>
          Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác
        </h1>
        <p>Xem ở mọi nơi. Hủy bất kỳ lúc nào.</p>
        <h3>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
          thành viên của bạn.
        </h3>
        {!email ? (
          <div className="input">
            <input
              type="text"
              placeholder="Địa chỉ Email"
              ref={emailRef}
              autoComplete="off"
            />
            <button className="registerButton" onClick={handleStart}>
              Bắt đầu nào
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="text"
              placeholder="Tên người dùng"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="registerButton" onClick={handleFinish}>
              Bắt đầu
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
