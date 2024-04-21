import {
  ArrowBackOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
// import axios from "axios";
// import CryptoJS from "crypto-js";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../../userContext/apiCalls";
import { UserContext } from "../../userContext/userContext";
import "./user.css";
import { AuthContext } from "../../authContext/AuthContext";

export default function User() {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: dispatchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")).info || {}
  );

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser(user, dispatch);
    navigate("/users");
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setUser({ ...user, [e.target.name]: value });
  };

  // useEffect(() => {
  //   const secretKey = process.env.REACT_APP_SECRET_KEY;
  //   const decrypted = CryptoJS.AES.decrypt(user.password, secretKey);

  //   const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
  //   setUser({ ...user, password: passworDecrypted });
  // }, []);

  console.log(user);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <div className="userLeftTitle">
          <Link to="/">
            <div className="back">
              <ArrowBackOutlined />
            </div>
          </Link>
          <h1 className="userTitle">Người dùng</h1>
        </div>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user?.profliePicture ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user?.username}</span>
              <span className="userShowUserTitle">
                {user?.isAdmin ? "Admin" : "Người dùng"}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết tài khoản</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.username}</span>
            </div>
            <span className="userShowTitle">Thông tin</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user?.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Việt Nam | Huế</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Xem thông tin</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Tên người dùng</label>
                <input
                  type="text"
                  placeholder={user?.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="username"
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user?.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="email"
                />
              </div>

              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Việt Nam | Huế"
                  className="userUpdateInput"
                  disabled
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleUpdateUser}>
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
