import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteList,
  deleteMany,
  getLists,
} from "../../context/listContext/apiCalls";
import { ListContext } from "../../context/listContext/listContext";
import "./listList.css";

export default function ListList() {
  const { lists, dispatch } = useContext(ListContext);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },

    { field: "title", headerName: "Tiêu đề", width: 150 },
    { field: "type", headerName: "Kiểu", width: 170 },
    { field: "genre", headerName: "Thể loại", width: 200 },

    {
      field: "action",
      headerName: "Chức năng",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/lists/" + params.row._id, list: params.row }}
            >
              <button className="productListEdit">Sửa</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const handleDeleteMany = async () => {
    console.log(ids);
    await deleteMany(ids, dispatch);
  };

  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        // disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          setIds(ids);
        }}
      />
      <button className="btnDeleteMany" onClick={handleDeleteMany}>
        Xoá
      </button>
      <Link to="/newList">
        <button className="btnCreate">Thêm</button>
      </Link>
    </div>
  );
}
