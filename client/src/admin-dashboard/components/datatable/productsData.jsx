import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  productColumns,
  storeColumns,
  userColumns,
  userRows,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";

function ProductsData() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + `/products?perPage=990`;
    setLoading(true);
    try {
      let resp = await doApiGet(url);
      let temp = resp.data.map((item, idx) => {
        return { id: idx + 1, ...item };
      });
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
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/products/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Product deleted");
        }
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there was a problem deleting the product");
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="./single"
              state={{ item: params.row }}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
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
      {/* <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div> */}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
}

export default ProductsData;
