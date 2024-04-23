import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./newUser.css";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext/userContext";
import { createUser } from "../../context/userContext/apiCalls";
import storage from "../../firebase.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Không được bỏ trống."),
  email: yup
    .string()
    .required("Không được bỏ trống.")
    .email("Email không hợp lệ."),
  password: yup.string().required("Không được bỏ trống."),
});

export default function NewUser() {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const [uploaded, setUploaded] = useState(0);
  const [profliePicture, setProfliePicture] = useState(null);
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      isAdmin: user.active,
      profliePicture: user.profliePicture,
    };
    try {
      await createUser(payload, dispatch);
      alert("Thêm mới người dùng thành công!");
      history.push("/users");
    } catch (error) {
      setError("email", error.response.data);
    }
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
            {...register("username")}
          />
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username.message}</span>
          )}
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input
            type="password"
            placeholder="Mật khẩu"
            name="password"
            {...register("password")}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
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
          <button className="newUserButton" onClick={handleSubmit(onSubmit)}>
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
