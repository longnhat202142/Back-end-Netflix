import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./newUser.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { createUser } from "../../context/userContext/apiCalls";
import storage from "../../firebase.js";

export default function NewUser() {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const [uploaded, setUploaded] = useState(0);
  const [profliePicture, setProfliePicture] = useState(null);
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    history.push("/users");
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_change",
        (snaphot) => {
          const progress =
            (snaphot.bytesTransferred / snaphot.totalBytes) * 100;
          console.log("Upload " + progress + "  % doen");
        },
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      {
        file: profliePicture,
        label: "profliePicture",
      },
    ]);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Thêm người dùng</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên người dùng</label>
          <input
            type="text"
            placeholder="Tên người dùng"
            name="username"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>isAdmin</label>
          <select
            className="newUserSelect"
            id="isAdmin"
            name="active"
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Ảnh</label>
          <input
            type="file"
            id="img"
            name="profliePicture"
            onChange={(e) => setProfliePicture(e.target.files[0])}
          />
        </div>
        {uploaded === 1 ? (
          <button className="newUserButton" onClick={handleSubmit}>
            Thêm
          </button>
        ) : (
          <button className="newUserButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
