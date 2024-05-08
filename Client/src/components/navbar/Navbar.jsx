import { ArrowDropDown, Search } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import { MovieContext } from "../../movieContext/movieContext";

import "./Navbar.scss";
import { getMoviesRandom, searchMoviesApi } from "../../movieContext/apiCalls";
// import { findMoviesSuccess } from "../../movieContext/movieAction";

const Navbar = () => {
  const { dispatchAu } = useContext(AuthContext);
  const { dispatch } = useContext(MovieContext);
  const [searchMovie, setSearchMovie] = useState("");

  const [user] = useState(JSON.parse(localStorage.getItem("user")).info || {});
  // Kiểm tra xem có thanh chuột không
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // Tìm kiếm phim

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchMovie(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchMovie) searchMoviesApi(searchMovie, dispatch);
    else getMoviesRandom(null, null, dispatch);
  };

  return (
    <div className={isScrolled ? "navbar scroll" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
              alt=""
            />
          </Link>
          <Link to="/" className="link">
            <span>Trang chủ</span>
          </Link>

          <Link to="/movies" className="link">
            <span className="navarLinks">Phim</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navarLinks">Series</span>
          </Link>
        </div>
        <div className="right">
          <div className="searchmovie">
            <input
              type="text"
              placeholder="Tìm kiếm phim"
              className="searchmovie_Input"
              spellCheck={false}
              onChange={handleChange}
            />

            <Search className="icon" onClick={handleSearch} />
          </div>

          <span>Xin chào : {user?.username}</span>
          <NotificationsIcon className="icon" />
          <img
            src={
              user?.profliePicture
                ? user.profliePicture
                : "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
            }
            alt=""
          />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>
                {" "}
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={"/account"}
                >
                  Cài đặt
                </Link>
              </span>
              <span onClick={() => dispatchAu(logout())}>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
