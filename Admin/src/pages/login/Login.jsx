import React, { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/authContext";
import PersonIcon from "@mui/icons-material/Person";
import PasswordOutlinedIcon from "@mui/icons-material/Password";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    login({ email, password }, dispatch);
  };
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => {
    setShowPass(!showPass);
  };
  return (
    <div className="wrapper">
      <form className="form-login">
        <h1 className="form-heading">Đăng nhập</h1>
        <div className="form-group">
          <PersonIcon className="iconLogin" />
          <input
            type="text"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <PasswordOutlinedIcon className="iconLogin" />
          <input
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="eye">
            <VisibilityOutlinedIcon onClick={togglePass} />
          </div>
        </div>

        <button
          className="form-submit"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
