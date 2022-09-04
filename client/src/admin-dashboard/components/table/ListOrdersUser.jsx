import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTimeAndDateFormat } from "../../../utils/dateRormated";
import { Link } from "react-router-dom";

const ListOrdersUser = ({ ar }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Time and Date</TableCell>
            <TableCell className="category">Total price</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Actoin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ar.map((row, idx) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.short_id}</TableCell>
              <TableCell className="tableCell">{getTimeAndDateFormat(row.date_created)}</TableCell>
              <TableCell className="tableCell">{row.total_price}</TableCell>
              <TableCell className="tableCell">{row.status}</TableCell>
              <TableCell className="tableCell">
                <div className="cellAction">
                  <Link
                    to="/admin-dashboard/orders/single"
                    state={{ item: row }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="viewButton">View</div>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListOrdersUser;
