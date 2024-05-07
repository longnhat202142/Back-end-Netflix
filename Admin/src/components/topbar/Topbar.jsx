import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/authContext.js";
import { useContext } from "react";
import { logout } from "../../context/authContext/authAction.js";
import { useState } from "react";
export default function Topbar() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")).info || {});
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Trang chủ Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src={
              user.profliePicture
                ? user.profliePicture
                : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            alt=""
            className="topAvatar"
          />

          <div className="topbarIconContainer">
            <span className="topbarLogOut" onClick={() => dispatch(logout())}>
              Đăng xuất
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
