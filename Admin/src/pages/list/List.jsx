import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { updateList } from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import "./list.css";

export default function List() {
  const location = useLocation();
  const list = location.list;
  const history = useHistory();
  const { dispatch } = useContext(ListContext);

  // const history = useHistory();
  // useEffect(() => {
  //   getLists(dispatch);
  // }, [dispatch]);
  console.log(list);
  const handleUpdate = (e) => {
    e.preventDefault();
    updateList(list, dispatch);
    history.push("/lists");
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Danh sách</h1>
        <Link to="/newList" style={{ display: "inline-block" }}>
          <button className="productAddButton">Thêm danh sách</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productInfoKey">Tiêu đề</span>
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Thể loại:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Kiểu</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Tiêu đề </label>
            <input type="text" placeholder={list.title} />
            <label>Thể loại</label>
            <input type="text" placeholder={list.genre} />
            <label>Kiểu</label>
            <input type="text" placeholder={list.type} />
            <button className="productButton" onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
