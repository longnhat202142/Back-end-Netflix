import { ArrowBackOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import httpClient from "../../api/httpClient";
import "./Watch.scss";

export default function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await httpClient.get("/movie/find/" + id, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>

      <iframe
        width="100%"
        height="100%"
        src={movie?.trailer}
        title={movie?.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
