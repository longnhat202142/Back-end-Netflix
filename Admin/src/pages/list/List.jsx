import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import "./list.css";
import { ArrowBackOutlined } from "@material-ui/icons";
import axios from "axios";

export default function List() {
  const history = useHistory();
  const { dispatch } = useContext(ListContext);
  const { id } = useParams();
  const [list, setList] = useState();
  const handleChange = (e) => {
    const value = e.target.value;

    setList({ ...list, [e.target.name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(list, dispatch);
    history.push("/lists");
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8800/api/list/find/" + id, {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      if (res.status === 200) {
        const data = res.data;
        setList({ ...data });
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <div className="productLeftTitle">
          <Link to="/lists">
            <div className="back">
              <ArrowBackOutlined />
            </div>
          </Link>
          <h1 className="productTitle">Danh sách</h1>
        </div>

        <Link to="/newList" style={{ display: "inline-block" }}>
          <button className="productAddButton">Thêm danh sách</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productInfoKey">Tiêu đề</span>
            <span className="productName">{list?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{list?.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Kiểu</span>
              <span className="productInfoValue">{list?.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tiêu đề </label>
            <input
              type="text"
              placeholder={list?.title}
              onChange={handleChange}
              name="title"
            />
            <label>Thể loại</label>
            <input
              type="text"
              placeholder={list?.genre}
              onChange={handleChange}
              name="genre"
            />
            <label>Kiểu</label>
            <select name="type" onChange={handleChange}>
              <option value="">--- Thể loại ---</option>
              <option value="movies">Phim</option>
              <option value="series">Series</option>
            </select>
            {/* <input
              type="text"
              placeholder={list.type}
              onChange={handleChange}
              name="type"
            /> */}
            <button className="productButton" onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
