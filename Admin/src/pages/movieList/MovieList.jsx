import { DeleteOutline, Search } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import {
  deleteMany,
  deleteMovies,
  getMovies,
  searchMovieApi,
} from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/movieContext";
import "./movieList.css";

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext);
  const [searchMovie] = useState("");
  const [ids, setIds] = useState([]);
  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

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
    searchMovieApi(value, dispatch);
  }, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovieApi(searchMovie, dispatch);
  };
  const handleDelete = (id) => {
    deleteMovies(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Tên phim",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Thể loại", width: 150 },
    { field: "year", headerName: "Năm sản xuất", width: 170 },
    { field: "limit", headerName: "Độ tuổi", width: 120 },
    { field: "isSeries", headerName: "Loạt phim", width: 150 },

    {
      field: "action",
      headerName: "Chức năng",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
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
    await deleteMany(ids, dispatch);
  };

  return (
    <>
      <div className="productList">
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
            rows={movies}
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
        <Link to="/newmovie">
          <button className="btnCreate">Thêm</button>
        </Link>
      </div>
    </>
  );
}
