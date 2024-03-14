import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./Featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/movie/random?type=${type}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDYxMGMyODJmMTRmODU1MWE5MzkzZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxMDEyNjY0NH0.gMYhwfh4xUT-DW2ZRbilF1LBSMDLSAQfc2qn_tTwchY",
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
            <option>Thể loại</option>
            <option value="Hanhdong">Hành dộng</option>
            <option value="Thethao">Thể thao</option>
            <option value="Kinhdi">Kinh dị</option>
            <option value="Hoathinh">Hoạt hình</option>
          </select>
        </div>
      )}
      <img width="100%" src={content.img} alt="" />

      <div className="info">
        <img src={content.imgSm} alt="" />

        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
