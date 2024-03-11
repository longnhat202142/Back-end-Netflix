import {
  Add,
  PlayArrow,
  ThumbDownRounded,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../api/httpClient";
import "./ListItem.scss";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Pagination } from 'swiper/modules';
export default function ListItem({ index, item }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await httpClient.get("/movie/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDYxMGMyODJmMTRmODU1MWE5MzkzZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDg4NzYwMDN9.5wbBVbCVQIhF5zZUhoi45vDV900Aclarh6MakNdbe8M",
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
    <Link to={{ pathname: "/watch" }}>
      {movie && (
        <div className="listItem">
          <img src={movie.img} alt="" />
          <div className="listItem-popup">
            <h1>hello</h1>
            {/* <iframe
              src="https://www.youtube.com/embed/tsNswx0nRKM"
              title="React Node.js Netflix App | MERN Stack + JWT Full Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe> */}
            {/* <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownRounded className="icon" />
              </div>

              <div className="itemInfoTop">
                <span>1h14p</span>
                <span className="limit"> +{movie.limit}</span>
                <span>{movie.year}</span>
              </div>

              <div className="desc">{movie.desc}</div>

              <div className="genre">{movie.genre}</div>
            </div> */}
          </div>
        </div>
      )}
    </Link>
  );
}
