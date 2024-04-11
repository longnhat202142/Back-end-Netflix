import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../api/httpClient";
import "./ListItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownRounded,
} from "@mui/icons-material";
export default function ListItem({ index, item }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await httpClient.get("/movie/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{ pathname: "/watch/" + item }}>
      {movie && (
        <div className="listItem">
          <img src={movie.img} alt="" />
          <div className="listItem-popup">
            <iframe
              src={movie.trailer}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownRounded className="icon" />
              </div>

              <div className="itemInfoTop">
                <span>{movie.year}</span>
              </div>

              <div className="desc">{movie.desc}</div>

              <div className="genre">{movie.genre}</div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
