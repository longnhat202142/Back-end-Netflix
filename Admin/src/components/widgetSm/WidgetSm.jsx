import { useState, useEffect } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

import axios from "axios";
export default function WidgetSm() {
  const [newUser, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/user?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDYxMGMyODJmMTRmODU1MWE5MzkzZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwODkxODgyN30.3_Gj-epBtKo5gOk1yd_i-QuYy9U8enzyC-tY7lG2z4E",
          },
        });
        setNewUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.profilePicture ||
                "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
