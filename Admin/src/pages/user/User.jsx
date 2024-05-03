import {
  ArrowBackOutlined,
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import "./user.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { updateUser } from "../../context/userContext/apiCalls";
import CryptoJS from "crypto-js";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

export default function User() {
  const { id } = useParams();

  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  const [user, setUser] = useState();
  const [newUser, setNewUser] = useState(user);
  let phoneNumber = null;
  const handleChange = (e) => {
    const value = e.target.value;

    setNewUser({ ...newUser, [e.target.name]: value });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();

    updateUser(id, newUser, dispatch);
    console.log(newUser);
    alert("Cập nhật người dùng thành công");
    history.push("/users");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      const res = await axios.get("http://localhost:8800/api/user/find/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      if (res.status === 200) {
        const data = res.data;
        const secretKey = process.env.REACT_APP_SECRET_KEY;
        const decrypted = CryptoJS.AES.decrypt(data.password, secretKey);

        const passworDecrypted = decrypted.toString(CryptoJS.enc.Utf8);
        setUser({ ...data, password: passworDecrypted });
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, []);

  function RandomPhoneNumber() {
    const generateRandomNumber = (length) => {
      return Math.floor(Math.random() * Math.pow(10, length));
    };

    const areaCode = generateRandomNumber(3);
    const mainNumber = generateRandomNumber(7);
    return `+84 ${areaCode} ${mainNumber}`;
  }
  phoneNumber = useMemo(() => RandomPhoneNumber(), []);
  function getRandomDateOfBirth() {
    const day = Math.floor(Math.random() * 28) + 1;
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * (2010 - 1995 + 1)) + 1995;
    const dateOfBirth = `${day}/${month}/${year}`;

    return dateOfBirth;
  }
  const randomDateOfBirth = useMemo(() => getRandomDateOfBirth(), []);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <div className="userLeftTitle">
          <Link to="/users">
            <div className="back">
              <ArrowBackOutlined />
            </div>
          </Link>
          <h1 className="userTitle">Người dùng</h1>
        </div>
        <Link to="/newUser">
          <button className="userAddButton">Thêm người dùng</button>
        </Link>
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
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{randomDateOfBirth}</span>
            </div>
            <span className="userShowTitle">Thông tin</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{phoneNumber}</span>
            </div>
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
                <label>Mật khẩu</label>
                <input
                  type="text"
                  placeholder={user?.password}
                  className="userUpdateInput"
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <div className="userUpdateItem">
                <label>Điện thoại</label>
                <input
                  type="text"
                  placeholder={phoneNumber}
                  className="userUpdateInput"
                  disabled
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
