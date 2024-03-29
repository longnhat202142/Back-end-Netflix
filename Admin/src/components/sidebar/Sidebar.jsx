import {
  LineStyle,
  ListAltOutlined,
  PermIdentity,
  PlayCircleOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <h3 className="sidebarTitle">Yêu cầu</h3>
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Phim
              </li>
            </Link>

            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <ListAltOutlined className="sidebarIcon" />
                Danh sách
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
