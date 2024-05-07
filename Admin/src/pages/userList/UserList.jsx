import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, Search } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteMany,
  deleteUsers,
  getUsers,
  searchUsersApi,
} from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/userContext";
import "./userList.css";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const [ids, setIds] = useState([]);
  const [searchUser] = useState("");

  // Xây dựng để trách việc Call Api liên tục
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const handleChange = debounce((e) => {
    const value = e.target.value;
    // setSearchUser(value);
    searchUsersApi(value, dispatch);
  }, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsersApi(searchUser, dispatch);
  };

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Tên người dùng",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.profliePicture
                  ? params.row.profliePicture
                  : "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 150,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/user/" + params.row._id }}>
              <button className="userListEdit">Sửa</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  const handleDeleteMany = async () => {
    await deleteMany(ids, dispatch);
  };

  return (
    <>
      <div className="userList">
        <div className="searchmovie">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="searchmovie_Input"
            // spellCheck={false}
            onChange={handleChange}
          />

          <Search className="icon" onClick={handleSearch} />
        </div>
        {
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            getRowId={(row) => row._id}
            onSelectionModelChange={(ids) => {
              setIds(ids);
            }}
          />
        }
      </div>
      <div className="container">
        <button className="btnDeleteMany" onClick={handleDeleteMany}>
          Xoá
        </button>
        <Link to="newUser">
          <button className="btnCreate">Thêm</button>
        </Link>
      </div>
    </>
  );
}
