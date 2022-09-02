import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { storeColumns, userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../../services/apiService";

function StoresData() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + `/stores`;
    setLoading(true);
    try {
      let resp = await doApiGet(url);
      let temp = resp.data.map((item, idx) => {
        return { id: idx + 1, ...item };
      });
      console.log(temp);
      setData(temp);
    } catch (err) {
      alert("Something went wrong");
      if (err.response) {
        console.log(err.response.data);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      let url = API_URL + `/users/delete/${_idDel}`;
      try {
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          doApi();
        }
      } catch (err) {
        alert("There was a problem with deleting the user ");
        if (err.response) {
          console.log(err.response.data);
        }
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="cellAction">
            <Link to="./single" state={{ item: params.row }} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  if (loading || !data) return "";
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={storeColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
}

export default StoresData;
