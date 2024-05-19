import { ArrowDropDown, Search } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import { MovieContext } from "../../movieContext/movieContext";

import MenuIcon from "@mui/icons-material/Menu";
import { getMoviesRandom, searchMoviesApi } from "../../movieContext/apiCalls";
import "./Navbar.scss";
// import { findMoviesSuccess } from "../../movieContext/movieAction";

const Navbar = () => {
  const { dispatchAu } = useContext(AuthContext);
  const { dispatch } = useContext(MovieContext);
  const [searchMovie, setSearchMovie] = useState("");

  const [user] = useState(JSON.parse(localStorage.getItem("user")).info || {});
  // Kiểm tra xem có thanh chuột không
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setIsMenuOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu visibility
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
          <Link to="/" className="link" onClick={() => setSearchMovie("")}>
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
          {/* <Menu className="hamburger" onClick={toggleMenu} />{" "} */}
          {/* Hamburger icon */}
        </div>
        <MenuIcon className="menubar-icon" onClick={toggleMenu} />
      </div>
      {/* {isMenuOpen && (
        <div className="menu">
          <Link to="/movies" className="link">
            <span className="navarLinks">Phim</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navarLinks">Series</span>
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to={"/account"}
          >
            <span>Cài đặt</span>
          </Link>
          <span onClick={() => dispatchAu(logout())}>Đăng xuất</span>
        </div>
      )} */}

      {isMenuOpen && (
        <div className="menu">
          <ul>
            <li>
              <span style={{ textAlign: "center", display: "block" }}>
                Xin chào : {user?.username}
              </span>
            </li>
            <li>
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
            </li>
            <li>
              <Link to={"/account"}>Cài đặt</Link>
            </li>
            <li>
              <span
                style={{ display: "block" }}
                onClick={() => dispatchAu(logout())}
              >
                Đăng xuất
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
