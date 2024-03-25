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
  const { dispatchau } = useContext(AuthContext);
  const { dispatch } = useContext(MovieContext);
  const [searchMovie, setSearchMovie] = useState("");

  // Kiểm tra xem có thanh chuột không
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // useEffect(() => {
  //   const findMovies = async () => await searchMoviesApi(searchMovie, dispatch);

  //   if (searchMovie) findMovies();
  // }, [searchMovie]);

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
          <img
            src="https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940"
            alt=""
          />
          <Link to="/" className="link">
            <span>Trang chủ</span>
          </Link>

          <Link to="/movies" className="link">
            <span className="navarLinks">Phim</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navarLinks">Series</span>
          </Link>
          <span>Đề xuất</span>
          <span>Danh sách</span>
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

          <span>Trẻ em</span>
          <NotificationsIcon className="icon" />
          <img
            src="data:image/jpeg;base64,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"
            alt=""
          />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Cài đặt</span>
              <span onClick={() => dispatchau(logout())}>Đăng xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
