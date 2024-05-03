import axios from "axios";
import "./widgetLg.css";
import { useEffect, useState } from "react";

export default function WidgetLg() {
  const [newUser, setNewUsers] = useState([]);
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/user?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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
  const DateComponent = ({ data }) => {
    // Dữ liệu ngày tạo
    const createdAt = data;

    // Chuyển đổi chuỗi thành đối tượng Date
    const dateObject = new Date(createdAt);

    // Lấy ngày, tháng và năm từ đối tượng Date
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
    const year = dateObject.getFullYear();

    // Định dạng ngày/tháng/năm theo định dạng dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    return <p className="DateFormat">{formattedDate}</p>;
  };
  // const Button = ({ type }) => {
  //   return <button className={"widgetLgButton " + type}>{type}</button>;
  // };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Đã tạo thành công</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Người dùng</th>
            <th className="widgetLgTh">Ngày tạo</th>
            <th className="widgetLgTh">Trạng thái</th>
          </tr>

          {newUser.map((user, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <img
                  src={
                    user?.profilePicture ||
                    "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg"
                  }
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{user.username}</span>
              </td>
              <td className="widgetLgDate">
                <DateComponent data={user.createdAt} />
              </td>

              <td className="widgetLgStatus">
                <p className="LgStatusText">Thêm thành công</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
