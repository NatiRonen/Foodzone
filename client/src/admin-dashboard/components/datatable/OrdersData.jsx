import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  OrderColumns,
  storeColumns,
  userColumns,
  userRows,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../../services/apiService";
import { toast } from "react-toastify";
function OrdersData() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + `/orders/allOrders?perPage=990`;
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
    if (window.confirm("Are you sure you want to delete the order?")) {
      try {
        let url = API_URL + "/orders/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Order deleted");
        }
        // to show the new list without the order that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        toast.error("It's not you, it's us. Please try again");
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
      <DataGrid
        className="datagrid"
        rows={data}
        columns={OrderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
}

export default OrdersData;
