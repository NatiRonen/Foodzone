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
      return <div className={`cellWithStatus ${params.row}`}>{params.row.role}</div>;
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
