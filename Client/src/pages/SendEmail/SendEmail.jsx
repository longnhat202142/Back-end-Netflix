import { useContext, useState } from "react";
import "./SendEmail.scss";
import { changePassword, getPassword } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";

export default function SendEmail() {
  const [email, setEmail] = useState("");
  // const { dispatchAu } = useContext(AuthContext);

  const handleGetPassword = async (e) => {
    e.preventDefault();
    const res = await getPassword({ email });
    console.log(res);
    if (res) {
      alert(res.message);
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

          <Link to={"/login"}>
            <button className="loginButton">Trở về</button>
          </Link>
        </div>
      </div>

      <div className="container">
        <form action="">
          <h1>Quên mật khẩu</h1>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="loginButton" onClick={handleGetPassword}>
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}
