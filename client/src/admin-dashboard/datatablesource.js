import { getTimeAndDateFormat } from "../utils/dateRormated";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.picture} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  // {
  //   field: "age",
  //   headerName: "Age",
  //   width: 100,
  // },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row}`}>{params.row.role.replaceAll("_", " ")}</div>
      );
    },
  },
];

export const storeColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "store",
    headerName: "Store",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.imgUrl} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row}`}>{params.row.status}</div>;
    },
  },
];
export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.imgUrl} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },

  {
    field: "category",
    headerName: "Category",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row}`}>{params.row.category}</div>;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row}`}>{params.row.price}</div>;
    },
  },
];
export const OrderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "short",
    headerName: "Order",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.short_id}</div>;
    },
  },

  {
    field: "date",
    headerName: "Date",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.date_created}`}>
          {getTimeAndDateFormat(params.row.date_created)}
          {/* {params.row.date_created} */}
        </div>
      );
    },
  },
  {
    field: "total_price",
    headerName: "Total Price",
    width: 160,
    renderCell: (params) => {
      return <div className={`cellWithStatus ${params.row}`}>{params.row.total_price}</div>;
    },
  },
  {
    field: "status",
    headerName: "status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row}`}>
          {params.row.status?.replaceAll("_", " ")}
        </div>
      );
    },
  },
];
