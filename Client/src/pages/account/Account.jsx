import {
  ArrowBackOutlined,
  LocationSearching,
  MailOutline,
  PermIdentity,
} from "@material-ui/icons";

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../authContext/apiCalls";

import "./Account.css";
import { AuthContext } from "../../authContext/AuthContext";
export default function User() {
  const { dispatchAu } = useContext(AuthContext);

  const [user] = useState(JSON.parse(localStorage.getItem("user")).info || {});
  const [newUser, setNewUser] = useState(user);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const { password, _id, ...rest } = newUser;
    updateUser(_id, rest, dispatchAu);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setNewUser({ ...newUser, [e.target.name]: value });
  };

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
        <div className="userRightTitle">
          <Link to="/changepass">
            <div className="userChangePass">Đổi mật khẩu</div>
          </Link>
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
                  src={user?.profliePicture}
                  alt=""
                />
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
