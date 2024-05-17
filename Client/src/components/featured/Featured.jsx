import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./Featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/movie/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer " +
                JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getRandomContent();
  }, [type]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/movie", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        if (res.data) {
          const genreList = res.data.map((e) => e.genre);
          const newGenres = [...new Set(genreList)];
          setGenres(newGenres);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Thể loại</option>
            {genres.map((e, index) => (
              <option key={index} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>
      )}
      <img width="100%" src={content.img} alt="" />

      <div className="info">
        <img src={content.imgSm} alt="" />

        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link to={{ pathname: "/watch/" + content._id }} className="play">
            <PlayArrow
              style={{
                background: " rgb(0 0 0 / 53%)",
                marginRight: "5px",
              }}
            />
            <span style={{ color: "black" }}>Xem</span>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Thông tin</span>
          </button>
        </div>
      </div>
    </div>
  );
}
