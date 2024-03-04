import {
  Add,
  PlayArrow,
  ThumbDownRounded,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import "./ListItem.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Pagination } from 'swiper/modules';
export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "/movie/find/" + "65e09c5c58ac68ae36fff73a",
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDYxMGMyODJmMTRmODU1MWE5MzkzZCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDg4NzYwMDN9.5wbBVbCVQIhF5zZUhoi45vDV900Aclarh6MakNdbe8M",
            },
          }
        );

        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{ pathname: "/watch" }}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        {movie && <img src={movie.img} alt="" />}
        {isHovered && movie && (
          <>
            {/* <iframe src={movie.trailer}></iframe>
             */}
            <iframe
              width="1903"
              height="750"
              src="https://www.youtube.com/embed/tsNswx0nRKM"
              title="React Node.js Netflix App | MERN Stack + JWT Full Tutorial"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <div className="itemInfo">
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
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
